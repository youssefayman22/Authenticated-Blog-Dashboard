// filepath: src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import postsReducer from './PostsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export default store;