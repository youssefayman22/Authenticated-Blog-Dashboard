import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Redux slice for managing post-related state.
 *
 * This slice handles adding and deleting posts. Posts are persisted in localStorage
 * to maintain state across browser sessions.
 *
 * @typedef {Object} postPayload
 * @property {string} title - The title of the post.
 * @property {string} content - The content/body of the post.
 * @property {number} id - A unique identifier for the post.
 * @property {string} createdBy - The email of the user who created the post.
 *
 * @typedef {Object} postsState
 * @property {postPayload[]} posts - An array of post objects.
 *
 * @function addPost
 * Adds a new post to the state and updates localStorage.
 *
 * @function deletePost
 * Removes a post by its ID from the state and updates localStorage.
 *
 * @example
 * dispatch(postsActions.addPost({ id: 1, title: "Hello", content: "World", createdBy: "user@example.com" }));
 * dispatch(postsActions.deletePost(1));
 */

interface postsState{
  posts: postPayload[];
}

interface postPayload{
  title: string;
  content: string;
  id: number;
  createdBy: string;
}
const initialPostsState: postsState = {
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
    addPost(state, action: PayloadAction<postPayload>) {
      const newPost = {
        title: action.payload.title,
        content: action.payload.content,
        id: action.payload.id,
        createdBy: action.payload.createdBy, 
      };
      state.posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;