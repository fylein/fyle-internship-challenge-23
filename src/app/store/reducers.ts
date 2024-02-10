import { createReducer, on } from '@ngrx/store';
import {
  fetchUserData,
  setUserData,
  updateNoOfRecords,
  setNoRecords,
} from './actions';
import { githubData, AppState } from './state';

export const appReducer = createReducer(
  AppState,
  on(fetchUserData, (state, { username, noOfRepos }) => {
    console.log(username);
    return { ...AppState };
  }),
  on(setUserData, (state, { userData, reposData, noOfRecords }) => {
    console.log(userData, reposData);
    return {
      ...state,
      users: userData,
      repos: [...reposData],
      showRecords: noOfRecords,
    };
  }),
  on(updateNoOfRecords, (state, { noOfRecords, username }) => {
    return { ...state };
  }),
  on(setNoRecords, (state, { reposData, noOfRecords }) => {
    return { ...state, repos: [...reposData], showRecords: noOfRecords };
  })
);
