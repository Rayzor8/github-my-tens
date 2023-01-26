export interface GithubRepos {
  repos: [] | Repos[];
  user: string;
  isLoading: Boolean;
  error: any;
  profile: null| Profile;
}

export interface Repos {
  id: number;
  name: string;
  html_url: string;
}

export interface ServerError {
  message: string;
  documentation_url: string;
}

 interface Profile {
  login: string;
  id: number;
  avatar_url:string
  url:string;
}
