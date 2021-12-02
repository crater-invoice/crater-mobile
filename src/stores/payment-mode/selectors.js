import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const modeStore = state => state?.paymentMode;

export const modesSelector = createSelector(
  modeStore,
  store => {
    if (isEmpty(store?.modes)) return [];
    return store.modes.map(mode => ({title: mode?.name, fullItem: mode}));
  }
);

export const loadingSelector = createSelector(
  modeStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
