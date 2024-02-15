import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, githubData, userReposType, userType } from './state';

const rootState = createFeatureSelector<githubData>('userState');

export const selectState = createSelector(rootState, (data) => data);
export const getUserDetails = createSelector(rootState, (data) => data.users);
export const getUserRepos = createSelector(rootState, (data) => data.repos);
export const getLoadError = createSelector(
  rootState,
  (data) => data.load_Error
);
export const getNoRecords = createSelector(
  rootState,
  (data) => data.pageState.showRecords
);

export const getPageDetails = createSelector(
  rootState,
  (data) => data.pageState
);
