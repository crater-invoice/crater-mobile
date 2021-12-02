import Request from 'utils/request';
import * as queryString from 'query-string';
/**
 * Fetch units
 * @param q : queryString
 * @returns {*}
 */
export const fetchItemUnits = q => {
  return Request.get(`/units?${queryString.stringify(q)}`);
};

/**
 * Add unit
 * @param data
 * @returns {*}
 */
export const addItemUnit = data => {
  return Request.post(`/units`, data);
};

/**
 * Update unit
 * @param id : unit id
 * @param data
 * @returns {*}
 */
export const updateItemUnit = data => {
  return Request.put(`/units/${data.id}`, data);
};

/**
 * Remove unit
 * @param id : unit id
 * @returns {*}
 */
export const removeItemUnit = id => {
  return Request.delete(`/units/${id}`);
};
