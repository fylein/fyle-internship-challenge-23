import { Injectable } from '@angular/core';
import {
  fetchUserData,
  setNoRecords,
  setUserData,
  updateNoOfRecords,
  updatePageNo,
  setPageNo,
  setLoadError,
} from './actions';
import { ApiService } from '../services/api/api.service';
import { switchMap, concat, map, exhaustMap, of, forkJoin } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs';

@Injectable()
export class Effects {
  constructor(private action$: Actions, private apiService: ApiService) {}

  loadData$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchUserData),
      switchMap((action) =>
        concat(
          of(setLoadError({ isLoading: true, isError: false, isDirty: true })),
          forkJoin([
            this.apiService.getUserBio(action.username),
            this.apiService.getUserRepos(
              action.username,
              action.noOfRepos,
              action.page
            ),
          ]).pipe(
            switchMap(([userDataRes, reposDataRes]) => [
              setLoadError({ isError: false, isLoading: false, isDirty: true }),
              setUserData({
                userData: userDataRes.data,
                reposData: reposDataRes.data,
                noOfRecords: action.noOfRepos,
                totalRepos: userDataRes.data.public_repos,
              }),
            ]),
            catchError((error) => {
              console.error(error);
              return of(
                setLoadError({ isError: true, isLoading: false, isDirty: true })
              );
            })
          )
        )
      )
    )
  );

  updateNoRecords$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateNoOfRecords),
      switchMap((action) =>
        concat(
          of(setLoadError({ isLoading: true, isError: false, isDirty: true })),
          this.apiService
            .getUserRepos(action.username, action.noOfRecords, action.page)
            .pipe(
              switchMap((updatedRecords) => {
                return [
                  setLoadError({
                    isError: false,
                    isLoading: false,
                    isDirty: true,
                  }),
                  setNoRecords({
                    reposData: updatedRecords.data,
                    noOfRecords: action.noOfRecords,
                    page: action.page,
                  }),
                ];
              }),
              catchError((error) => {
                return of(
                  setLoadError({
                    isError: true,
                    isLoading: false,
                    isDirty: true,
                  })
                );
              })
            )
        )
      )
    )
  );

  updatePageNo$ = createEffect(() =>
    this.action$.pipe(
      ofType(updatePageNo),
      switchMap((action) =>
        concat(
          of(setLoadError({ isLoading: true, isError: false, isDirty: true })),
          this.apiService
            .getUserRepos(action.username, action.noOfRecords, action.page)
            .pipe(
              switchMap((updatedPage) => {
                return [
                  setLoadError({
                    isError: false,
                    isLoading: false,
                    isDirty: true,
                  }),
                  setPageNo({
                    reposData: updatedPage.data,
                    page: action.page,
                    noOfRecords: action.noOfRecords,
                  }),
                ];
              }),
              catchError((error) => {
                return of(
                  setLoadError({
                    isError: true,
                    isLoading: false,
                    isDirty: true,
                  })
                );
              })
            )
        )
      )
    )
  );
}
