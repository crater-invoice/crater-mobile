import {formatItemUnits} from '@/utils';
import {createSelector} from 'reselect';

const unitsSelector = createSelector(
  units => units,
  units => formatItemUnits(units)
);

export {unitsSelector};
