import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { authState } from "../store/AuthSlice";


/**
 * Creates a mock authentication state for testing Redux-connected components.
 *
 * @function
 * @param {Partial<authState>} [overrides] - Optional overrides to customize the default mock state.
 * @returns {{ auth: authState }} A mock Redux state object with authentication data.
 *
 * @example
 * const mockState = createMockAuthState({ isAuthenticated: true });
 */

const mockStore = configureMockStore();

export const createMockAuthState = (
  overrides?: Partial<authState>
): { auth: authState } => ({
  auth: {
    isAuthenticated: false,
    email: "",
    signedUpEmails: [],
    ...overrides,
  },
});

export const renderWithMockStore = (
  ui: React.ReactElement,
  initialState: any = {},
  route: string = "/"
) => {
  const store = mockStore(initialState);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
};
