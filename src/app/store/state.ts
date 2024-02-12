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
  html_url: string;
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

export interface pageHandlers {
  showRecords: number;
  total: number;
  current: number;
}

export interface githubData {
  users: userType;
  repos: userReposType[];
  pageState: pageHandlers;
}

export function returnBlankUser() {
  return {
    login: '',
    id: '',
    avatar_url: '',
    html_url: '',
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
  };
}

export function newPageHandler() {
  return {
    total: 0,
    showRecords: 10,
    current: 1,
  };
}

export const AppState: githubData = {
  repos: [],
  users: returnBlankUser(),
  pageState: newPageHandler(),
};
