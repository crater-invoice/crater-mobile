import Request from 'utils/request';
import * as types from './types';

/**
 * Fetch companies
 * @returns {*}
 */
export const fetchCompanies = () => {
  return Request.get({path: `companies/get`});
};

/**
 * Fetch single company
 * @param id : company id
 * @returns {*}
 */
export const fetchSingleCompany = id => {
  return Request.get({path: `companies/${id}`});
};

/**
 * Add company
 * @param body : params
 * @returns {*}
 */
export const addCompany = body => {
  return Request.post({path: `companies`, body});
};

/**
 * Update company
 * @param id : company id
 * @param body : params
 * @returns {*}
 */
export const updateCompany = (id, body) => {
  return Request.put({path: `companies/${id}`, body});
};

/**
 * Remove company
 * @param id : company id
 * @returns {*}
 */
export const removeCompany = id => {
  return Request.post({path: `companies/delete`, body: {companies: [id]}});
};

/**
 * Fetch currencies
 * @returns {*}
 */
export const fetchCurrencies = () => {
  return Request.get({path: `currencies`});
};

/**
 * Fetch languages
 * @returns {*}
 */
export const fetchLanguages = () => {
  return Request.get({path: `config/languages`});
};

/**
 * Fetch timezones
 * @returns {*}
 */
export const fetchTimezones = q => {
  return Request.get({path: `timezones`});
};

/**
 * Fetch date-formats
 * @returns {*}
 */
export const fetchDateFormats = q => {
  return Request.get({path: `date/formats`});
};

/**
 * Fetch fiscal-years
 * @returns {*}
 */

export const fetchFiscalYears = q => {
  return Request.get({path: `config/fiscal/years`});
};

/**
 * Fetch preferences
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
 * Update preferences
 * @param body : params
 * @returns {*}
 */
export const updatePreferences = body => {
  return Request.post({path: `company/settings`, body});
};
