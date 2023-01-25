import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export interface GithubRepos {
  repos: [] | Repos[];
  user: string;
  isLoading: Boolean;
  error: null | unknown;
  profile: {};
}

interface Repos {
  id:number
  full_name:string
}

export const fetchRepositories = createAsyncThunk(
  "fetchRepos/repositories",
  async (user:string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_GITHUB_USERS as string
        }/${user}/repos?per_page=50`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
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
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: GithubRepos = {
  repos: [],
  user: "",
  isLoading: false,
  error: null,
  profile: {},
};

export const githubReposSlice = createSlice({
  name: "githubRepos",
  initialState,
  reducers: {},
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
    });
  },
});

// export const {} = githubReposSlice.actions;

export default githubReposSlice.reducer;
