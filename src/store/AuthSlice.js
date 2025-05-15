import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  email: localStorage.getItem("email") || "",
  signedUpEmails: JSON.parse(localStorage.getItem("signedUpEmails")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signup(state, action) {
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
    login(state, action) {
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
