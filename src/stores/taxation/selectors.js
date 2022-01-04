import {createSelector} from 'reselect';

const taxationStore = state => state?.taxation;

export const loadingSelector = createSelector(
  taxationStore,
  store => store?.isSaving
);
