import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GithubRepos {
  repos: [];
  user: string;
}

const initialState: GithubRepos = {
  repos: [],
  user: "ray",
};

export const githubReposSlice = createSlice({
  name: "githubRepos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  },
});

export const {} = githubReposSlice.actions;

export default githubReposSlice.reducer;
