import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState{
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
