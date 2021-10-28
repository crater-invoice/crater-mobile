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
 * Add company
 * @param body : params
 * @returns {*}
 */
export const addCompany = body => {
  return Request.post({path: `companies`, body});
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

/**
 * Upload company logo
 * @param logo
 * @param id : company id
 * @returns {*}
 */
export const uploadCompanyLogo = (logo, id) => {
  return Request.post({
    path: `company/upload-logo`,
    image: logo,
    imageName: 'company_logo',
    headers: {company: id}
  });
};
