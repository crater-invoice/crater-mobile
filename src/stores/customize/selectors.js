import {createSelector} from 'reselect';

const customizeStore = state => state?.customizes;
const settingsStore = state => state?.settings;

export const loadingSelector = createSelector(
  customizeStore,
  store => store?.isSaving
);

export const customFieldsSelector = createSelector(
  settingsStore,
  store => store?.customFields
);
