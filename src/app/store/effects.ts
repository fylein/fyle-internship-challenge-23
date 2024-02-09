import { Injectable } from '@angular/core';
import { getUserData, setUserData } from './actions';
import { ApiService } from '../services/api.service';
import { mergeMap, map, exhaustMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState, githubData } from './state';
import { catchError } from 'rxjs';

@Injectable()
export class Effects {
  constructor(private action$: Actions, private apiService: ApiService) {}
  loadData$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUserData),
      exhaustMap((action) =>
        this.apiService.getUserBio(action.username).pipe(
          map((response) => {
            console.log(response);
            const githubData = response.data as githubData;
            return setUserData({ data: githubData });
          })
          //   catchError((error) => of(setUserDataFailure({ error })))
        )
      )
    )
  );
}
