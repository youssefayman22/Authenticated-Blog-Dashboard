import { render, screen, fireEvent } from "@testing-library/react";
import NewPost from "./NewPost";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/Store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { postsActions } from "../../store/PostsSlice";
import Layout from "../Layout/Layout"; // adjust path if needed

const mockStore = configureMockStore<Partial<RootState>>();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams()],
  };
});

const renderWithStore = (store: any) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "new-post", element: <NewPost /> },
        ],
      },
    ],
    {
      initialEntries: ["/new-post"],
    }
  );

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe("NewPost Component", () => {
  const email = "user@example.com";

  it("renders the form correctly", () => {
    const store = mockStore({ auth: { email, isAuthenticated: true, signedUpEmails: [] } });
    renderWithStore(store);

    expect(screen.getByRole("heading", { name: /create new post/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create post/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("dispatches addPost and navigates on submit", () => {
    const store = mockStore({ auth: { email, isAuthenticated: true, signedUpEmails: [] } });
    store.dispatch = jest.fn();

    renderWithStore(store);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "Test Content" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create post/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: postsActions.addPost.type,
        payload: expect.objectContaining({
          title: "Test Title",
          content: "Test Content",
          createdBy: email,
        }),
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/posts");
  });

  it("navigates to /posts when cancel is clicked", () => {
    const store = mockStore({ auth: { email, isAuthenticated: true, signedUpEmails: [] } });
    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/posts");
  });

});
