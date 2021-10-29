import Request from '@/utils/request';

/**
 * Fetch Tax And Discount Per item
 * @returns {*}
 */
export const fetchTaxAndDiscountPerItem = () => {
  return Request.get({
    path: `company/settings`,
    axiosProps: {
      params: {settings: ['tax_per_item', 'discount_per_item']}
    }
  });
};

/**
 * Ping endpoint url
 * @param url
 * @returns {*}
 */
export const pingUrl = url => {
  return Request.get({
    path: `ping`,
    isAuthRequired: false,
    isPing: `${url}/api/`
  });
};

/**
 * Check app version
 * @returns {*}
 */
export const checkAppVersion = () => {
  return Request.get({path: 'app/version', isAuthRequired: false});
};

/**
 * Fetch bootstrap
 * @returns {*}
 */
export const fetchBootstrap = () => {
  return Request.get({path: 'bootstrap'});
};

/**
 * Fetch countries
 * @returns {*}
 */
export const fetchCountries = () => {
  return Request.get({path: 'countries'});
};
