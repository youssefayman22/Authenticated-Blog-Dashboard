import authReducer, { authActions } from "./AuthSlice";

describe("authSlice", () => {
  const initialState = {
    isAuthenticated: false,
    email: "",
    signedUpEmails: [],
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle signup", () => {
    const action = authActions.signup({ email: "test@example.com" });
    const state = authReducer(initialState, action);
    expect(state.signedUpEmails).toContain("test@example.com");
  });

  it("should handle login", () => {
    const action = authActions.login({
      email: "test@example.com",
      token: "abc123",
    });
    const state = authReducer(
      { ...initialState, signedUpEmails: ["test@example.com"] },
      action
    );
    expect(state.isAuthenticated).toBe(true);
    expect(state.email).toBe("test@example.com");
  });

  it("should handle logout", () => {
    const loggedInState = {
      isAuthenticated: true,
      email: "test@example.com",
      signedUpEmails: ["test@example.com"],
    };
    const state = authReducer(loggedInState, authActions.logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.email).toBe("");
  });
});
