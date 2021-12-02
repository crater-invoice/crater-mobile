import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const unitStore = state => state?.itemUnit;

export const unitsSelector = createSelector(
  unitStore,
  store => {
    if (isEmpty(store.units)) return [];
    return store.units.map(unit => ({title: unit?.name, fullItem: unit}));
  }
);

export const loadingSelector = createSelector(
  unitStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
