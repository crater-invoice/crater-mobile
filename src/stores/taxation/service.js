import Request from 'utils/request';

/**
 * Fetch sales tax rate
 * @param data
 * @returns {*}
 */
export const fetchSalesTaxRate = data => {
  return Request.post(
    `/api/m/sales/tax/us/tax`,
    {...data, address: data},
    {'base-url': true}
  );
};
