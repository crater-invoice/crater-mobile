import {formatItemUnits} from '@/utils';
import {createSelector} from 'reselect';

export const unitsSelector = createSelector(
  units => units,
  units => formatItemUnits(units)
);
