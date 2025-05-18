import { screen, fireEvent, render } from "@testing-library/react";
import {
  renderWithMockStore,
  createMockAuthState,
} from "../../mocks/mockStore";
import Profile from "./Profile";
import { authActions } from "../../store/AuthSlice";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/Store";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Profile Component", () => {
  const mockStore = configureMockStore<Partial<RootState>>();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("displays the user email from Redux state", () => {
    const state = createMockAuthState({
      isAuthenticated: true,
      email: "testuser@example.com",
      signedUpEmails: ["testuser@example.com"],
    });

    renderWithMockStore(<Profile />, state);

    expect(
      screen.getByText(/email: testuser@example.com/i)
    ).toBeInTheDocument();
  });

  it("dispatches logout and navigates to home on logout click", () => {
    const state = createMockAuthState({
      isAuthenticated: true,
      email: "testuser@example.com",
      signedUpEmails: ["testuser@example.com"],
    });

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(authActions.logout());
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
