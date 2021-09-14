import {isEmpty} from '@/constants';
import {createSelector} from 'reselect';

export const currenciesSelector = createSelector(
  currencies => currencies,
  currencies =>
    !isEmpty(currencies)
      ? currencies.map(currency => ({
          title: currency.name,
          subtitle: {
            title: currency.code
          },
          rightTitle: currency.symbol || '-',
          fullItem: currency
        }))
      : []
);

export const languagesSelector = createSelector(
  languages => languages,
  languages =>
    !isEmpty(languages)
      ? languages.map(language => {
          const {name} = language;
          return {
            title: name,
            leftAvatar: name.toUpperCase().charAt(0),
            fullItem: language
          };
        })
      : []
);

export const timeZonesSelector = createSelector(
  timezones => timezones,
  timezones =>
    !isEmpty(timezones)
      ? timezones.map(timezone => ({title: timezone.key, fullItem: timezone}))
      : []
);

export const dateFormatsSelector = createSelector(
  dateFormats => dateFormats,
  dateFormats =>
    !isEmpty(dateFormats)
      ? dateFormats.map(dateformat => {
          let trimDates = {};
          for (const key in dateformat) {
            trimDates = {
              ...trimDates,
              [key]: dateformat[key].trim()
            };
          }

          return {
            title: dateformat.display_date,
            fullItem: dateformat
          };
        })
      : []
);

export const fiscalYearsSelector = createSelector(
  fiscalYears => fiscalYears,
  fiscalYears =>
    !isEmpty(fiscalYears)
      ? fiscalYears.map(year => ({title: year.key, fullItem: year}))
      : []
);

export const retrospectiveEditsSelector = createSelector(
  RetrospectiveEdits => RetrospectiveEdits,
  RetrospectiveEdits =>
    !isEmpty(RetrospectiveEdits)
      ? RetrospectiveEdits.map(edit => ({title: edit.key, fullItem: edit}))
      : []
);
