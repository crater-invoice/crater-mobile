import {formatItemUnits} from '@/utils';
import {createSelector} from 'reselect';

export const getUnitState = createSelector(
  units => units,
  units => formatItemUnits(units)
);
