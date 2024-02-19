import { createAction, props } from "@ngrx/store";
import { user } from "../types";


export const loadUser = createAction('[User] load user',props<{query:string}>())
export const loadUserSuccess = createAction('[User] load user success',props<{user:user}>())
export const loadUserFailure = createAction('[User] load user failure',props<{error:string}>())

export const loadRepos = createAction('[Repos] load repos',props<{username:string,perPage:string,page:string}>())
export const loadReposSuccess = createAction('[Repos] load repos success',props<{repos:any[]}>())
export const loadReposFailure = createAction('[Repos] load repos faliure',props<{error:string}>())

export const toggleLoadingUser = createAction('[User] toggle loading user')
export const toggleLoadingRepos = createAction('[Repos] toggle loading repos')

export const removeError = createAction('[user] remove error')