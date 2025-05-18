import { render, screen, fireEvent } from "@testing-library/react";
import DashBoard from "./DashBoard";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/Store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";
import { postsActions } from "../../store/PostsSlice";
import { authActions } from "../../store/AuthSlice";

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
        children: [{ path: "dashboard", element: <DashBoard /> }],
      },
    ],
    {
      initialEntries: ["/dashboard"],
    }
  );

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe("DashBoard Component", () => {

  it("renders Profile and Posts when authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: ["user@example.com"] },
      posts: { posts: [] },
    });

    renderWithStore(store);

    expect(screen.getByRole("heading", { name: /user profile/i })).toBeInTheDocument();
    expect(screen.getByText(/email: user@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /posts/i })).toBeInTheDocument();
    expect(screen.getByText(/no posts available/i)).toBeInTheDocument();
  });

  it("renders user's posts when authenticated and posts exist", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        email: "user@example.com",
        signedUpEmails: ["user@example.com", "someoneelse@example.com" ],
      },
      posts: {
        posts: [
          { id: 1, title: "First Post", content: "Hello world", createdBy: "user@example.com" },
          { id: 2, title: "Second Post", content: "Another post", createdBy: "user@example.com" },
          { id: 3, title: "Other User's Post", content: "Should not show", createdBy: "someoneelse@example.com" },
        ],
      },
    });

    renderWithStore(store);

    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.queryByText("Other User's Post")).not.toBeInTheDocument();
  });

  it("dispatches deletePost when delete button is clicked", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        email: "user@example.com",
        signedUpEmails: ["user@example.com"],
      },
      posts: {
        posts: [
          { id: 1, title: "First Post", content: "Hello world", createdBy: "user@example.com" },
        ],
      },
    });

    store.dispatch = jest.fn();

    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(store.dispatch).toHaveBeenCalledWith(postsActions.deletePost(1));
  });

  it("dispatches logout and navigates to / when logout is clicked", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        email: "user@example.com",
        signedUpEmails: ["user@example.com"],
      },
      posts: { posts: [] },
    });

    store.dispatch = jest.fn();

    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    expect(store.dispatch).toHaveBeenCalledWith(authActions.logout());
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
