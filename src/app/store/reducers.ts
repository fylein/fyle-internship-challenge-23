import { createReducer, on } from '@ngrx/store';
import {
  fetchUserData,
  setUserData,
  updateNoOfRecords,
  setNoRecords,
  updatePageNo,
  setPageNo,
  setLoadError,
} from './actions';
import { githubData, AppState } from './state';

export const appReducer = createReducer(
  AppState,
  on(fetchUserData, (state, { username }) => {
    return { ...AppState };
  }),
  on(setUserData, (state, { userData, reposData, noOfRecords, totalRepos }) => {
    return {
      ...state,
      users: userData,
      repos: [...reposData],
      pageState: { ...state.pageState, total: totalRepos },
    };
  }),
  on(updateNoOfRecords, (state) => {
    return { ...state };
  }),
  on(setNoRecords, (state, { reposData, noOfRecords, page }) => {
    return {
      ...state,
      repos: [...reposData],
      pageState: {
        ...state.pageState,
        showRecords: noOfRecords,
        current: page,
      },
    };
  }),
  on(updatePageNo, (state) => {
    return { ...state };
  }),
  on(setPageNo, (state, { reposData, page, noOfRecords }) => {
    return {
      ...state,
      repos: [...reposData],
      pageState: {
        ...state.pageState,
        current: page,
        showRecords: noOfRecords,
      },
    };
  }),
  on(setLoadError, (state, { isError, isLoading }) => {
    return { ...state, load_Error: { isError, isLoading } };
  })
);
