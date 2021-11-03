import {isEmpty} from '@/constants';
import {createSelector} from 'reselect';
import t from 'locales/use-translation';

const companyStore = state => state?.company;

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

export const fiscalYearsSelector = createSelector(
  state => toArray(state, 'fiscalYears'),
  fiscalYears => fiscalYears.map(year => ({title: year.key, fullItem: year}))
);

export const retrospectiveEditsSelector = createSelector(
  state => state?.common?.config?.retrospective_edits,
  retrospectiveEdits =>
    isEmpty(retrospectiveEdits)
      ? []
      : retrospectiveEdits.map(edit => ({
          ...edit,
          title: t(edit.key),
          fullItem: {...edit, title: t(edit.key)}
        }))
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

export const languagesSelector = createSelector(
  state => toArray(state, 'languages'),
  languages =>
    languages.map(_lng => ({
      title: _lng.name,
      leftAvatar: _lng.name.toUpperCase().charAt(0),
      fullItem: _lng
    }))
);

export const companiesSelector = state =>
  isEmpty(state?.company?.companies) ? [] : state?.company?.companies;

export const currentCompanySelector = state => state.company?.selectedCompany;

export const currentCurrencySelector = state =>
  state.company?.selectedCompanyCurrency;
