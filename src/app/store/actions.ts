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
  }>()
);

export const updateNoOfRecords = createAction(
  '[GitHub RecCount] Update count',
  props<{ noOfRecords: number; username: string; page: number }>()
);

export const setNoRecords = createAction(
  '[GitHub RecCount] Set count',
  props<{ reposData: userReposType[]; noOfRecords: number }>()
);
