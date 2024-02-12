export interface Repo {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    topics: string[];
    stargazers_count: number;
}