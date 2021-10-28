import {formatCountries} from '@/utils';
import {createSelector} from 'reselect';

const getStateCountries = createSelector(
  countries => countries,
  countries => formatCountries(countries ?? [])
);

export {getStateCountries};
