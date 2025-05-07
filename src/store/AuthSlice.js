import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  email: localStorage.getItem("email") || "",
  signedUpEmails: JSON.parse(localStorage.getItem("signedUpEmails")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.userPosts = action.payload.posts || [];

      if (!state.signedUpEmails.includes(action.payload.email)) {
        state.signedUpEmails.push(action.payload.email);
      }
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem(
        "signedUpEmails",
        JSON.stringify(state.signedUpEmails)
      );
      console.log("User Posts:", state.userPosts);
    },
    logout(state) {
      state.token = null;
      state.email = "";
      state.isAuthenticated = false;
      state.userPosts = [];
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },

    /*  const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
      state.userPosts = allPosts.filter(
        (post) => post.createdBy === action.payload.email
      ); */
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
