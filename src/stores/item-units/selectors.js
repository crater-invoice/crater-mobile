import {formatItemUnits} from '@/utils';
import {createSelector} from 'reselect';

const unitStore = state => state?.itemUnits;

export const unitsSelector = createSelector(
  units => units,
  units => formatItemUnits(units)
);

export const loadingSelector = createSelector(
  unitStore,
  mode => ({isSaving: mode?.isSaving, isDeleting: mode?.isDeleting})
);
