import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store/Store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";
import Layout from "../../Pages/Layout/Layout";
import Modes from "../../Pages/Modes/Modes";

 // Dynamic mock for useSearchParams
let mockSearchParams = new URLSearchParams("mode=login");

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => jest.fn(),
    useSearchParams: () => [mockSearchParams],
  };
});

const mockStore = configureMockStore<Partial<RootState>>();

const createMockAuthState = (overrides = {}) => ({
  auth: {
    isAuthenticated: false,
    email: "",
    signedUpEmails: [],
    ...overrides,
  },
});

const renderWithRouter = (store: any, initialPath = "/signup?mode=login") => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Modes /> },
          { path: "signup", element: <UserForm /> },
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

describe("UserForm Component - Login Mode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams("mode=login");
  });

  it("renders login form correctly", () => {
    const store = mockStore(createMockAuthState({ signedUpEmails: ["test@example.com"] }));
    renderWithRouter(store);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /go to sign up/i })).toBeInTheDocument();
  });

  it("submits login form and dispatches login action", async () => {
    const testEmail = "test@example.com";
    const testToken = "mock-token";

    const store = mockStore(
      createMockAuthState({ signedUpEmails: [testEmail] })
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            email: testEmail,
            token: testToken,
          }),
      })
    ) as jest.Mock;

    renderWithRouter(store);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: testEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        authActions.login({ email: testEmail, token: testToken })
      );
    });
  });

  it("shows error message on failed login", async () => {
    const store = mockStore(createMockAuthState({ signedUpEmails: ["test@example.com"] }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    ) as jest.Mock;

    renderWithRouter(store);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});

 

// Dynamic mock for useSearchParams
//Sign up test
/* let mockSearchParams = new URLSearchParams("mode=signup");

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => jest.fn(),
    useSearchParams: () => [mockSearchParams],
  };
});

const mockStore = configureMockStore<Partial<RootState>>();

const createMockAuthState = (overrides = {}) => ({
  auth: {
    isAuthenticated: false,
    email: "",
    signedUpEmails: [],
    ...overrides,
  },
});

const renderWithRouter = (store: any, initialPath = "/signup") => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Modes /> },
          { path: "signup", element: <UserForm /> },
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

describe("UserForm Component - Sign Up Mode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams("mode=signup");
  });

  it("renders signup form correctly", () => {
    const store = mockStore(createMockAuthState());
    renderWithRouter(store);

    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /go to login/i })).toBeInTheDocument();
  });

  it("submits signup form and dispatches signup action", async () => {
    const store = mockStore(createMockAuthState());

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            user: { email: "test@example.com" },
          }),
      })
    ) as jest.Mock;

    renderWithRouter(store);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        authActions.signup({ email: "test@example.com" })
      );
    });
  });

  it("shows error message on failed signup", async () => {
    const store = mockStore(createMockAuthState());

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Signup failed" }),
      })
    ) as jest.Mock;

    renderWithRouter(store);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
 */