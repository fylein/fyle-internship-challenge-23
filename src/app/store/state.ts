export interface userReposType {
  topics: string[];
  name: string;
  html_url: string;
  startgazers_count: number;
  description: string;
}

export interface userType {
  login: string;
  id: string;
  avatar_url: string;
  url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
  public_repos: string;
  followers: string;
  following: string;
}

export interface githubData {
  users: userType;
  repos: userReposType[];
}

export const AppState: githubData = {
  repos: [],
  users: {
    login: '',
    id: '',
    avatar_url: '',
    url: '',
    name: '',
    company: '',
    blog: '',
    location: '',
    email: '',
    bio: '',
    twitter_username: '',
    public_repos: '',
    followers: '',
    following: '',
  },
};
