import { createReducer, on } from '@ngrx/store';
import { getUserData, setUserData } from './actions';
import { githubData, AppState } from './state';

export const appReducer = createReducer(
  AppState,
  on(getUserData, (state, { username }) => {
    console.log(username);
    return { ...AppState };
  }),
  on(setUserData, (state, { userData, reposData }) => {
    console.log(userData, reposData);
    return {
      ...state,
      users: userData,
      repos: [...reposData],
    };
  })
);
