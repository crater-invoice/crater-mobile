import {createSelector} from 'reselect';

const modeStore = state => state?.paymentModes;

export const modesSelector = createSelector(
  modeStore,
  store => store?.modes ?? []
);

export const loadingSelector = createSelector(
  modeStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
