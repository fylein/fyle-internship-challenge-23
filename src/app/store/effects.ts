import { Injectable } from '@angular/core';
import {
  fetchUserData,
  setNoRecords,
  setUserData,
  updateNoOfRecords,
  updatePageNo,
  setPageNo,
} from './actions';
import { ApiService } from '../services/api/api.service';
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
            return setUserData({
              userData: userDataRes.data,
              reposData: reposDataRes.data,
              noOfRecords: action.noOfRepos,
              totalRepos: userDataRes.data.public_repos,
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
              return setNoRecords({
                reposData: updatedRecords.data,
                noOfRecords: action.noOfRecords,
                page: action.page,
              });
            })
          )
      )
    )
  );

  updatePageNo$ = createEffect(() =>
    this.action$.pipe(
      ofType(updatePageNo),
      switchMap((action) =>
        this.apiService
          .getUserRepos(action.username, action.noOfRecords, action.page)
          .pipe(
            map((updatedPage) => {
              return setPageNo({
                reposData: updatedPage.data,
                page: action.page,
                noOfRecords: action.noOfRecords,
              });
            })
          )
      )
    )
  );
}
