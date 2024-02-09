import { createAction, props } from '@ngrx/store';
import { githubData } from './state';

export const getUserData = createAction(
  '[GitHub State] Request',
  props<{ username: string }>()
);

export const setUserData = createAction(
  '[GitHub State] Set',
  props<{ data: githubData }>()
);
