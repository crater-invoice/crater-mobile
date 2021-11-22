import Request from 'utils/request';
import * as types from './types';

/**
 * Fetch companies
 * @returns {*}
 */
export const fetchCompanies = () => {
  return Request.get(`/companies`);
};

/**
 * Fetch company
 * @returns {*}
 */
export const fetchCompany = () => {
  return Request.get(`/current-company`);
};

/**
 * Add company
 * @param data
 * @returns {*}
 */
export const addCompany = data => {
  return Request.post(`/companies`, data);
};

/**
 * Update company
 * @param data
 * @returns {*}
 */
export const updateCompany = data => {
  return Request.put(`/company`, data);
};

/**
 * Fetch currencies
 * @returns {*}
 */
export const fetchCurrencies = () => {
  return Request.get(`/currencies`);
};

/**
 * Fetch timezones
 * @returns {*}
 */
export const fetchTimezones = q => {
  return Request.get(`/timezones`);
};

/**
 * Fetch date-formats
 * @returns {*}
 */
export const fetchDateFormats = q => {
  return Request.get(`/date/formats`);
};

/**
 * Fetch preferences
 * @returns {*}
 */
export const fetchPreferences = () => {
  return Request.get(`/company/settings`, {
    axiosProps: {
      params: {settings: types.PREFERENCES_SETTING_KEYS}
    }
  });
};

/**
 * Update preferences
 * @param data
 * @returns {*}
 */
export const updatePreferences = data => {
  return Request.post(`/company/settings`, data);
};

/**
 * Upload company logo
 * @param logo
 * @param id : company id
 * @returns {*}
 */
export const uploadCompanyLogo = (logo, id) => {
  return Request.post(
    `/company/upload-logo`,
    {},
    {image: logo, imageName: 'company_logo', headers: {company: id}}
  );
};

/**
 * Fetch company settings
 * @param settings : keys
 * @returns {*}
 */
export const fetchCompanySettings = settings => {
  return Request.get(`/company/settings`, {
    axiosProps: {params: {settings: settings ?? types.COMPANY_SETTING_KEYS}}
  });
};

/**
 * Update company settings
 * @param settings
 * @returns {*}
 */
export const updateCompanySettings = settings => {
  return Request.post(`/company/settings`, {settings});
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
