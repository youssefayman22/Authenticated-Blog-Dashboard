import { render, screen, fireEvent } from "@testing-library/react";
import Modes from "./Modes";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/Store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
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
        children: [{ path: "", element: <Modes /> }],
      },
    ],
    {
      initialEntries: ["/"],
    }
  );

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe("Modes Component", () => {
  it("renders Sign Up and Log in buttons", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, email: "", signedUpEmails: [] },
    });

    renderWithStore(store);

    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("navigates to /signup when Sign Up is clicked", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, email: "", signedUpEmails: [] },
    });

    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });

  it("navigates to /signup?mode=login when Log in is clicked", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, email: "", signedUpEmails: [] },
    });

    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/signup?mode=login");
  });

});
