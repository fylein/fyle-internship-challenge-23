import { user } from "../types";

export interface appState{
    user:user,
    repos:any[],
    error:string,
    loadingUser:boolean,
    loadingRepos:boolean
}