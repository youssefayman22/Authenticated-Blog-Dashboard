import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { authState } from "../store/AuthSlice"; // adjust path as needed

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
