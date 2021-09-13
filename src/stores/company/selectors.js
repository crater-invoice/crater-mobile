import {isEmpty} from '@/constants';

export const getCurrenciesList = currencies => {
  let currencyList = [];
  if (typeof currencies !== 'undefined' && currencies.length != 0) {
    currencies.map(currency => {
      const {name, code, symbol} = currency;

      currencyList.push({
        title: name,
        subtitle: {
          title: code
        },
        rightTitle: symbol || '-',
        fullItem: currency
      });
    });
  }
  return currencyList;
};

export const getLanguagesList = languages => {
  const languageList = [];
  if (typeof languages !== 'undefined' && languages) {
    languages.map(language => {
      const {name} = language;
      languageList.push({
        title: name,
        leftAvatar: name.toUpperCase().charAt(0),
        fullItem: language
      });
    });
  }
  return languageList;
};

export const getTimeZoneList = timezones => {
  if (isEmpty(timezones)) {
    return [];
  }

  return timezones.map(timezone => {
    return {title: timezone.key, fullItem: timezone};
  });
};

export const getDateFormatList = dateFormats => {
  if (isEmpty(dateFormats)) {
    return [];
  }

  return dateFormats.map(dateformat => {
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
  });
};

export const getFiscalYearList = fiscalYears => {
  if (isEmpty(fiscalYears)) {
    return [];
  }

  return fiscalYears.map(year => {
    return {title: year.key, fullItem: year};
  });
};

export const getRetrospectiveEditsList = RetrospectiveEdits => {
  if (isEmpty(RetrospectiveEdits)) {
    return [];
  }

  return RetrospectiveEdits.map(edit => {
    return {title: edit.key, fullItem: edit};
  });
};
