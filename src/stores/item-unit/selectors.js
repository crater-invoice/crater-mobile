import {formatItemUnits} from '@/utils';
import {createSelector} from 'reselect';

const unitStore = state => state?.itemUnit;

export const unitsSelector = createSelector(
  unitStore,
  store => formatItemUnits(store?.units)
);

export const loadingSelector = createSelector(
  unitStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
