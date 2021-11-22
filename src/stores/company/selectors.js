import {isEmpty} from '@/constants';
import {createSelector} from 'reselect';

const companyStore = state => state?.company;

const configStore = state => state.common?.config;

const toArray = (state, field) =>
  isEmpty(companyStore(state)[field]) ? [] : companyStore(state)[field];

export const timeZonesSelector = createSelector(
  state => toArray(state, 'timezones'),
  timezones => timezones.map(_tz => ({title: _tz.key, fullItem: _tz}))
);

export const dateFormatsSelector = createSelector(
  state => toArray(state, 'dateFormats'),
  dateFormats => dateFormats.map(_d => ({title: _d.display_date, fullItem: _d}))
);

export const loadingSelector = createSelector(
  companyStore,
  store => ({isSaving: store?.isSaving})
);

export const currenciesSelector = createSelector(
  state => toArray(state, 'currencies'),
  currencies =>
    currencies.map(_c => ({
      title: _c.name,
      subtitle: {title: _c.code},
      rightTitle: _c.symbol || '-',
      fullItem: _c
    }))
);

export const languagesSelector = state => {
  const languages = configStore(state)?.languages;
  if (isEmpty(languages)) return [];

  return languages.map(_lng => ({
    title: _lng.name,
    leftAvatar: _lng.name.toUpperCase().charAt(0),
    fullItem: _lng
  }));
};

export const fiscalYearsSelector = state => {
  const fiscalYears = configStore(state)?.fiscal_years;
  if (isEmpty(fiscalYears)) return [];
  return fiscalYears.map(year => ({title: year.key, fullItem: year}));
};

export const companiesSelector = state =>
  isEmpty(state?.company?.companies) ? [] : state?.company?.companies;

export const currentCompanySelector = state => state.company?.selectedCompany;

export const currentCurrencySelector = state =>
  state.company?.selectedCompanyCurrency;

export const selectedCompanySettingSelector = state =>
  state?.company?.selectedCompanySettings;
