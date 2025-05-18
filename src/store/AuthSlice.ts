import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Redux slice for managing authentication state.
 *
 * This slice handles user signup, login, and logout actions. It persists authentication
 * data (token, email, signed-up emails) in localStorage to maintain session state across reloads.
 *
 * @typedef {Object} authState
 * @property {boolean} isAuthenticated - Indicates if a user is currently authenticated.
 * @property {string} email - The email of the currently authenticated user.
 * @property {string[]} signedUpEmails - A list of emails that have signed up.
 *
 * @typedef {Object} signupPayload
 * @property {string} email - The email address used for signup.
 *
 * @typedef {Object} loginPayload
 * @property {string} email - The email address used for login.
 * @property {string} token - The authentication token.
 *
 * @function signup
 * Adds a new email to the list of signed-up users and stores it in localStorage.
 *
 * @function login
 * Authenticates a user if the email exists in the signed-up list and no user is currently logged in.
 * Stores the token and email in localStorage.
 *
 * @function logout
 * Clears the authentication state and removes token and email from localStorage.
 *
 * @example
 * dispatch(authActions.signup({ email: "user@example.com" }));
 * dispatch(authActions.login({ email: "user@example.com", token: "abc123" }));
 * dispatch(authActions.logout());
 */

export interface authState{
  isAuthenticated: Boolean;
  email: string;
  signedUpEmails: string[];
}

interface signupPayload {
  email: string;
}

interface loginPayload {
  email: string;
  token: string;
}
const storedEmails = localStorage.getItem("signedUpEmails");
const initialAuthState: authState = {
  isAuthenticated: !!localStorage.getItem("token"),
  email: localStorage.getItem("email") || "",
  signedUpEmails: storedEmails ? JSON.parse(storedEmails) : [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signup(state, action: PayloadAction<signupPayload>) {
      const { email } = action.payload;
      state.signedUpEmails.push(email);
      localStorage.setItem(
        "signedUpEmails",
        JSON.stringify(state.signedUpEmails)
      );
    },
    logout(state) {
      state.email = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
    login(state, action: PayloadAction<loginPayload>) {
      const { email, token } = action.payload;
      if (!state.isAuthenticated) {
        const existingEmail = state.signedUpEmails.find(
          (entry) => entry === email
        );
        if (existingEmail) {
          state.email = email;
          state.isAuthenticated = true;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
        } else {
          throw new Error("Email not found. Please sign up first.");
        }
      } else {
        throw new Error("There is a user already Logged in");
      }
    },
  },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;
