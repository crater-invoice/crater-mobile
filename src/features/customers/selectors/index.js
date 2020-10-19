import { formatCurrencies, formatCountries } from '@/utils';
import { createSelector } from 'reselect'


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
