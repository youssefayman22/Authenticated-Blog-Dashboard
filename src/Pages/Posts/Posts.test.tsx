import { render, screen, fireEvent } from "@testing-library/react";
import Posts from "./Posts";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/Store";
import { MemoryRouter } from "react-router-dom";
import { postsActions } from "../../store/PostsSlice";

const mockStore = configureMockStore<Partial<RootState>>();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderWithStore = (store: any) => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    </Provider>
  );
};

describe("Posts Component", () => {
  const samplePosts = [
    { id: 1, title: "Post 1", content: "Content 1", createdBy: "user@example.com" },
    { id: 2, title: "Post 2", content: "Content 2", createdBy: "other@example.com" },
  ];

  it("renders page title", () => {
    const store = mockStore({
      posts: { posts: [] },
      auth: { isAuthenticated: false, email: "", signedUpEmails: [] },
    });
    renderWithStore(store);
    expect(screen.getByRole("heading", { name: /posts/i })).toBeInTheDocument();
  });

  it("shows 'Create New Post' button when authenticated", () => {
    const store = mockStore({
      posts: { posts: [] },
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: ["user@example.com"] },
    });
    renderWithStore(store);
    expect(screen.getByRole("button", { name: /create new post/i })).toBeInTheDocument();
  });

  it("does not show 'Create New Post' button when not authenticated", () => {
    const store = mockStore({
      posts: { posts: [] },
      auth: { isAuthenticated: false, email: "", signedUpEmails: [] },
    });
    renderWithStore(store);
    expect(screen.queryByRole("button", { name: /create new post/i })).not.toBeInTheDocument();
  });

  it("renders only user's posts when authenticated", () => {
    const store = mockStore({
      posts: { posts: samplePosts },
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: ["user@example.com"] },
    });
    renderWithStore(store);
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
  });

  it("dispatches deletePost action when delete button is clicked", () => {
    const store = mockStore({
      posts: { posts: samplePosts },
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: ["user@example.com"] },
    });
    store.dispatch = jest.fn();

    renderWithStore(store);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(postsActions.deletePost(1));
  });

  it("navigates to /new-post when 'Create New Post' is clicked", () => {
    const store = mockStore({
      posts: { posts: [] },
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: ["user@example.com"] },
    });
    renderWithStore(store);

    const createButton = screen.getByRole("button", { name: /create new post/i });
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith("/new-post");
  });
});
