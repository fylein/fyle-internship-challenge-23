import { Actions, createEffect } from "@ngrx/effects";
import { catchError, map,mergeMap, of } from "rxjs";

import { ofType } from "@ngrx/effects";
import { ApiService } from "../services/api.service";
import { Injectable } from "@angular/core";
import { loadRepos, loadReposFailure, loadReposSuccess, loadUser, loadUserFailure, loadUserSuccess } from "./app.actions";

@Injectable()
export class appEffects{

    constructor(
        private actions$:Actions,
        private apiService : ApiService
    ){}

    userEffects$ = createEffect(()=>this.actions$.pipe(
        ofType(loadUser),
        mergeMap(action=>this.apiService.getUser(action.query).pipe(
            map((user)=>loadUserSuccess({user:user})),
            catchError((error)=>of(loadUserFailure({error:error.message})))
        ))
    ))

    repoEffects$ = createEffect(()=>this.actions$.pipe(
        ofType(loadRepos),
        mergeMap(action=>this.apiService.getRepos(action.username,action.page,action.perPage).pipe(
            map((data)=>loadReposSuccess({repos:data})),
            catchError((error)=>of(loadReposFailure({error:error.message})))
        ))
    ))
}