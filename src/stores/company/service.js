import Request from '@/utils/request';
import * as types from './types';

/**
 * fetch Currencies
 * @returns {*}
 */
export const fetchCurrencies = () => {
  return Request.get({path: `currencies`});
};

/**
 * fetch Languages
 * @returns {*}
 */
export const fetchLanguages = () => {
  return Request.get({path: `config/languages`});
};

/**
 * fetch timezones
 * @returns {*}
 */
export const fetchTimezones = q => {
  return Request.get({path: `timezones`});
};

/**
 * fetch Date-Formats
 * @returns {*}
 */
export const fetchDateFormats = q => {
  return Request.get({path: `date/formats`});
};

/**
 * fetch Fiscal-Years
 * @returns {*}
 */

export const fetchFiscalYears = q => {
  return Request.get({path: `config/fiscal/years`});
};

/**
 * fetch Retrospective-edits
 * @returns {*}
 */
export const fetchRetrospectives = q => {
  return Request.get({path: `config/retrospective-edit-options`});
};

/**
 * fetch Preferences
 * @returns {*}
 */
export const fetchPreferences = () => {
  return Request.get({
    path: `company/settings`,
    axiosProps: {
      params: {settings: types.PREFERENCES_SETTING_TYPE}
    }
  });
};

/**
 * update Preferences
 * @param body : params
 * @returns {*}
 */
export const updatePreferences = body => {
  return Request.post({path: `company/settings`, body});
};
