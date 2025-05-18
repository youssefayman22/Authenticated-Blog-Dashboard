import { render, screen } from "@testing-library/react";
import ProtectedRoute from "./ProtectedRoute";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/Store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const mockStore = configureMockStore<Partial<RootState>>();

const renderWithStore = (store: any, initialPath = "/protected") => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <div>Public Home</div>,
      },
      {
        path: "/protected",
        element: (
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        ),
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

describe("ProtectedRoute Component", () => {
  it("redirects to / when not authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, email: "", signedUpEmails: [] },
    });

    renderWithStore(store);

    expect(screen.getByText(/public home/i)).toBeInTheDocument();
    expect(screen.queryByText(/protected content/i)).not.toBeInTheDocument();
  });

  it("renders children when authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, email: "user@example.com", signedUpEmails: [] },
    });

    renderWithStore(store);

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });
});
