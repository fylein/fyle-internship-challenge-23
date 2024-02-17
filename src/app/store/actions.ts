import { createAction, props } from '@ngrx/store';
import { githubData, userReposType, userType } from './state';

export const fetchUserData = createAction(
  '[GitHub State] Request',
  props<{ username: string; noOfRepos: number; page: number }>()
);

export const setUserData = createAction(
  '[GitHub State] Set',
  props<{
    userData: userType;
    reposData: userReposType[];
    noOfRecords: number;
    totalRepos: number;
  }>()
);

export const updateNoOfRecords = createAction(
  '[GitHub RecCount] Update count',
  props<{ noOfRecords: number; username: string; page: number }>()
);

export const setNoRecords = createAction(
  '[GitHub RecCount] Set count',
  props<{
    reposData: userReposType[];
    noOfRecords: number;
    page: number;
  }>()
);

export const updatePageNo = createAction(
  '[GitHub RecCount] Update Page',
  props<{ noOfRecords: number; username: string; page: number }>()
);

export const setPageNo = createAction(
  '[GitHub RecCount] Set count',
  props<{
    reposData: userReposType[];
    page: number;
    noOfRecords: number;
  }>()
);
export const setLoadError = createAction(
  '[GitHub RecCount] Set Error',
  props<{ isError: boolean; isLoading: boolean; isDirty: boolean }>()
);
