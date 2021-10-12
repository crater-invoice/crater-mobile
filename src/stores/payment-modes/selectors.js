import {createSelector} from 'reselect';

const modeStore = state => state?.paymentModes;

export const modesSelector = createSelector(
  modeStore,
  paymentModes => paymentModes?.modes ?? []
);

export const loadingSelector = createSelector(
  modeStore,
  mode => ({isSaving: mode?.isSaving, isDeleting: mode?.isDeleting})
);
