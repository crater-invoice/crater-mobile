import { createSelector } from 'reselect'
import { formatCurrencies, formatCountries } from '../../../api/global';

const getStateCountries = createSelector(
    countries => countries,
    countries => formatCountries(countries ?? [])
);

const getStateCurrencies = createSelector(
    currencies => currencies,
    currencies => formatCurrencies(currencies ?? [])
);


export {
    getStateCountries,
    getStateCurrencies
}