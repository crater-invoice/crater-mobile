import {createSelector} from 'reselect';

const customizeStore = state => state?.customizes;
const settingsStore = state => state?.settings;

export const loadingSelector = createSelector(
  customizeStore,
  customize => customize?.isSaving
);

export const customFieldsSelector = createSelector(
  settingsStore,
  settings => settings?.customFields
);
