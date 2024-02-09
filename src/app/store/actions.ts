import { createAction, props } from '@ngrx/store';
import { githubData, userReposType, userType } from './state';

export const fetchUserData = createAction(
  '[GitHub State] Request',
  props<{ username: string }>()
);

export const setUserData = createAction(
  '[GitHub State] Set',
  props<{ userData: userType; reposData: userReposType[] }>()
);
