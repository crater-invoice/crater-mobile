import Request from 'utils/request';
import * as types from './types';

/**
 * Fetch companies
 * @returns {*}
 */
export const fetchCompanies = () => {
  return Request.get({path: `companies`});
};

/**
 * Fetch company
 * @returns {*}
 */
export const fetchCompany = () => {
  return Request.get({path: `current-company`});
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
 * @param body : params
 * @returns {*}
 */
export const updateCompany = body => {
  return Request.put({path: `company`, body});
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
      params: {settings: types.PREFERENCES_SETTING_KEYS}
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

/**
 * Fetch company settings
 * @param settings : keys
 * @returns {*}
 */
export const fetchCompanySettings = settings => {
  return Request.get({
    path: `company/settings`,
    axiosProps: {params: {settings: settings ?? types.COMPANY_SETTING_KEYS}}
  });
};

/**
 * Update company settings
 * @param settings : params
 * @returns {*}
 */
export const updateCompanySettings = settings => {
  return Request.post({path: `company/settings`, body: {settings}});
};

class Services {
  isPreferencesItemLoaded: boolean;
  isCurrenciesItemLoaded: boolean;

  constructor() {
    this.isPreferencesItemLoaded = false;
    this.isCurrenciesItemLoaded = false;
  }

  setIsPreferencesItemLoaded = () => (this.isPreferencesItemLoaded = true);

  setIsCurrenciesItemLoaded = () => (this.isCurrenciesItemLoaded = true);
}

export const CompanyServices = new Services();
