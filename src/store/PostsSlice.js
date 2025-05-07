import { createSlice } from "@reduxjs/toolkit";

const initialPostsState = {
  posts: (() => {
    try {
      const storedPosts = localStorage.getItem("posts");
      return storedPosts ? JSON.parse(storedPosts) : [];
    } catch (error) {
      console.error("Error parsing posts from localStorage:", error);
      return [];
    }
  })(),
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
        createdBy: action.payload.createdBy, 
      };
      state.posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;