import { Injectable } from '@angular/core';
import { getUserData, setUserData } from './actions';
import { ApiService } from '../services/api.service';
import { switchMap, map, exhaustMap, of, forkJoin } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState, githubData } from './state';
import { catchError } from 'rxjs';

@Injectable()
export class Effects {
  constructor(private action$: Actions, private apiService: ApiService) {}
  loadData$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUserData),
      switchMap((action) =>
        forkJoin([
          this.apiService.getUserBio(action.username),
          this.apiService.getUserRepos(action.username),
        ]).pipe(
          map(([userDataRes, reposDataRes]) => {
            console.log((userDataRes.data, reposDataRes.data));

            return setUserData({
              userData: userDataRes.data,
              reposData: reposDataRes.data,
            });
          }),
          catchError((error) => {
            throw error;
          })
        )
      )
    )
  );
}
