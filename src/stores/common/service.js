import Request from '@/utils/request';

/**
 * Fetch Tax And Discount Per item
 * @returns {*}
 */
export const fetchTaxAndDiscountPerItem = () => {
  return Request.get(`/company/settings`, {
    axiosProps: {
      params: {settings: ['tax_per_item', 'discount_per_item']}
    }
  });
};

/**
 * Check exchange rate
 * @param id : currency id
 * @returns {*}
 */
export const checkExchangeRate = id =>
  Request.get(`/currencies/${id}/exchange-rate`);

/**
 * Check exchange rate provider
 * @param id : currency id
 * @returns {*}
 */
export const checkExchangeRateProvider = id =>
  Request.get(`/currencies/${id}/active-provider`);

/**
 * Ping endpoint url
 * @param url
 * @returns {*}
 */
export const pingUrl = url => {
  return Request.get(`ping`, {isPing: `${url}/api/`});
};

/**
 * Check app version
 * @returns {*}
 */
export const checkAppVersion = () => {
  return Request.get('/app/version');
};

/**
 * Fetch bootstrap
 * @returns {*}
 */
export const fetchBootstrap = () => {
  return Request.get('/bootstrap');
};

/**
 * Fetch countries
 * @returns {*}
 */
export const fetchCountries = () => {
  return Request.get('/countries');
};

class Services {
  isCountriesItemLoaded: boolean;

  constructor() {
    this.isCountriesItemLoaded = false;
  }

  setIsCountriesItemLoaded = () => (this.isCountriesItemLoaded = true);
}

export const CommonServices = new Services();
