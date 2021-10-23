import Request from '@/utils/request';

/**
 * Fetch Tax And Discount Per item.
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
 * Ping url.
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
