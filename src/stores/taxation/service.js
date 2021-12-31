import Request from 'utils/request';

/**
 * Fetch taxation
 * @returns {*}
 */
export const fetchTaxation = () => Request.get('/tax-types');

/**
 * Update taxation
 * @param data
 * @returns {*}
 */
export const updateTaxationType = data => Request.put(`/tax-types`, data);
