export type user = {
    login:string
    name:string,
    avatar_url:string,
    html_url:string,
    location:string | null,
    email:string | null,
    followers:number,
    following:number,
    public_repos:number,
}

export type repo ={
    name:string,
    html_url:string,
    description:string,
    topics:string[]
}