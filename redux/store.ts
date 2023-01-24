import { configureStore } from "@reduxjs/toolkit";
import githubRepos from "../redux/slices/githubReposSlice";


export const store = configureStore({
  reducer: {
    data: githubRepos,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
