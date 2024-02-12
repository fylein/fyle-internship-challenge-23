import { Injectable } from '@angular/core';
import {
  fetchUserData,
  setNoRecords,
  setUserData,
  updateNoOfRecords,
} from './actions';
import { ApiService } from '../services/api.service';
import { switchMap, map, exhaustMap, of, forkJoin } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError } from 'rxjs';

@Injectable()
export class Effects {
  constructor(private action$: Actions, private apiService: ApiService) {}

  loadData$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchUserData),
      switchMap((action) =>
        forkJoin([
          this.apiService.getUserBio(action.username),
          this.apiService.getUserRepos(
            action.username,
            action.noOfRepos,
            action.page
          ),
        ]).pipe(
          map(([userDataRes, reposDataRes]) => {
            console.log((userDataRes.data, reposDataRes.data));

            return setUserData({
              userData: userDataRes.data,
              reposData: reposDataRes.data,
              noOfRecords: action.noOfRepos,
            });
          }),
          catchError((error) => {
            throw error;
          })
        )
      )
    )
  );

  updateNoRecords$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateNoOfRecords),
      switchMap((action) =>
        this.apiService
          .getUserRepos(action.username, action.noOfRecords, action.page)
          .pipe(
            map((updatedRecords) => {
              console.log(updatedRecords);
              return setNoRecords({
                reposData: updatedRecords.data,
                noOfRecords: action.noOfRecords,
              });
            })
          )
      )
    )
  );
}
