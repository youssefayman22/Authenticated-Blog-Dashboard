// filepath: src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import postsReducer from "./PostsSlice";

/**
 * Configures the Redux store for the application.
 *
 * This store combines the `auth` and `posts` reducers and provides typed access
 * to the state and dispatch functions.
 *
 * @typedef {RootState} RootState - The global state structure derived from the store.
 * @typedef {AppDispatch} AppDispatch - The dispatch function type for dispatching actions.
 *
 * @example
 * import store, { RootState, AppDispatch } from './store';
 * 
 * const state: RootState = store.getState();
 * const dispatch: AppDispatch = store.dispatch;
 */

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
