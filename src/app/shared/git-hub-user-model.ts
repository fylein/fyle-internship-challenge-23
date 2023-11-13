export interface GitHubUser {
    avatar_url: string;
    bio: string | null;
    followers: number;
    following: number;
    location: string | null;
    login: string;
    name: string;
    twitter_username: string | null;
}