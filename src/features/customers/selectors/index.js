import { createSelector } from 'reselect'
import { formatCurrencies } from '../../../api/global';

const getSateCountries = createSelector(
    countries => countries,
    countries => countries
);

const getSateCurrencies = createSelector(
    currencies => currencies,
    currencies => formatCurrencies(currencies ?? [])
);


export {
    getSateCountries,
    getSateCurrencies
}