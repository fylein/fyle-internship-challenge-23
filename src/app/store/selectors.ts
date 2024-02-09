import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, githubData, userReposType, userType } from './state';

const selectGithubFeature = createFeatureSelector<githubData>('userState');
export const selectState = createSelector(selectGithubFeature, (data) => data);
