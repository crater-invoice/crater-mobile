import { formatItemUnits } from '@/utils';
import { createSelector } from 'reselect';

const getUnitState = createSelector(
    units => units,
    units => formatItemUnits(units)
);

export { getUnitState };
