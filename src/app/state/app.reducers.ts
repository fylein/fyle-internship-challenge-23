import { createReducer, on } from "@ngrx/store";
import { user } from "../types";
import { loadReposFailure, loadReposSuccess, loadUserFailure, loadUserSuccess, removeError, toggleLoadingRepos, toggleLoadingUser } from "./app.actions";
import { appState } from "./app.state";

export const initialState : appState = {
    user:{
        login:"",
        name: "",
        avatar_url: "",
        html_url: "",
        location: null,
        email: null,
        followers: 0,
        following: 0,
        public_repos: 0 
        },
    repos:[],
    error:"",
    loadingUser:false,
    loadingRepos:false
} 


export const userReducer = createReducer(
    initialState,
    on(loadUserSuccess,(state,action)=>{
        return {...state,user:action.user,loadingUser:false}
    }),
    on(loadUserFailure,(state,action)=>{
        return {...initialState,error:action.error,loadingUser:false}
    }),
    on(removeError,(state)=>{
        return {...state,error:""}
    }),
    on(toggleLoadingUser,(state)=>({...state,loadingUser:!state.loadingUser}))
)

export const reposReducer = createReducer(
    initialState,
    on(loadReposSuccess,(state,action)=>{
        return {...state,repos:action.repos,loadingRepos:false}
    }),
    on(loadReposFailure,(state,action)=>{
        return {...initialState,error:action.error,loadingRepos:false}
    }),
    on(toggleLoadingRepos,(state)=> {
        return {...state,loadingRepos:true}
    })

)
