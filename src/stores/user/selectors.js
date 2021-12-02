import {createSelector} from 'reselect';

const userStore = state => state?.user;

export const currentUserSelector = createSelector(
  userStore,
  store => store.currentUser
);

export const loadingSelector = createSelector(
  userStore,
  store => store?.isSaving
);
