// filepath: src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  email:  localStorage.getItem("email") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expiration", action.payload.expiration);
      localStorage.setItem("email", action.payload.email);
      console.log(action.payload);
    },
    logout(state) {
      state.token = null;
      state.email = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
