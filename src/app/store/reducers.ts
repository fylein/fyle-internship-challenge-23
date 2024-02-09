import { createReducer, on } from '@ngrx/store';
import { fetchUserData, setUserData } from './actions';
import { githubData, AppState } from './state';

export const appReducer = createReducer(
  AppState,
  on(fetchUserData, (state, { username }) => {
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
