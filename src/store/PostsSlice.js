// filepath: src/store/postsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialPostsState = {
  posts: JSON.parse(localStorage.getItem("posts")) || [], // Load posts from localStorage
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    addPost(state, action) {
      const newPost = {
        title: action.payload.title,
        content: action.payload.content,
        id: action.payload.id,
      };
      state.posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(state.posts));
      console.log(newPost);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload); // Remove post by id
      localStorage.setItem("posts", JSON.stringify(state.posts)); // Update localStorage
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
