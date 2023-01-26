import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GithubRepos } from "../../types";

export const fetchRepositories = createAsyncThunk(
  "fetchRepos/repositories",
  async (user: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_GITHUB_USERS as string
        }/${user}/repos?per_page=100`
      );
      return data;
    } catch (error: any | unknown) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfileUser = createAsyncThunk(
  "fetchRepos/profileUser",
  async (user: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_GITHUB_USERS as string}/${user}`
      );
      return data;
    } catch (error: any | unknown) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: GithubRepos = {
  repos: [],
  user: "",
  isLoading: false,
  error: null,
  profile: null,
};

export const githubReposSlice = createSlice({
  name: "githubRepos",
  initialState,
  reducers: {
    emptyInput: (state) => {
      state.error = { message: "Please type username" };
      state.repos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepositories.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.repos = action.payload;
      state.error = null;
    });

    builder.addCase(fetchRepositories.rejected, (state, action) => {
      state.isLoading = false;
      state.repos = [];
      state.error = action.payload;
    });

    builder.addCase(fetchProfileUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProfileUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.profile = action.payload;
    });
    builder.addCase(fetchProfileUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = "";
      state.error = action.payload;
      state.profile = null;
    });
  },
});

export const { emptyInput } = githubReposSlice.actions;

export default githubReposSlice.reducer;
