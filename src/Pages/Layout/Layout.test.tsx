import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/Store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const mockStore = configureMockStore<Partial<RootState>>();

const renderWithStore = (store: any, initialPath = "/") => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <div>Mock Child Content</div>,
          },
        ],
      },
    ],
    {
      initialEntries: [initialPath],
    }
  );

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe("Layout Component", () => {
  it("renders NavBar with Home link when not authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, email: "", signedUpEmails: [] },
    });

    renderWithStore(store);

    expect(screen.getByText(/navigation bar/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /posts/i })).not.toBeInTheDocument();
  });

  it("renders NavBar with dashboard links when authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: [] },
    });

    renderWithStore(store);

    expect(screen.getByRole("link", { name: /posts/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /new post/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /home/i })).not.toBeInTheDocument();
  });

  it("renders Header with blog title and image", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: [] },
    });

    renderWithStore(store);

    expect(screen.getByRole("heading", { name: /welcome to the blog/i })).toBeInTheDocument();
    expect(screen.getByAltText(/blog/i)).toBeInTheDocument();
  });

  it("renders child content via Outlet", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: [] },
    });

    renderWithStore(store);

    expect(screen.getByText(/mock child content/i)).toBeInTheDocument();
  });
});
