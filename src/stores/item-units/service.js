import Request from '@/utils/request';
import * as queryString from 'query-string';
/**
 * Fetch units
 * @param q : queryString
 * @returns {*}
 */
export const getItemUnits = q => {
  return Request.get({path: `units?${queryString.stringify(q)}`});
};

/**
 * Add unit
 * @param body : params
 * @returns {*}
 */
export const createItemUnit = body => {
  return Request.post({path: `units`, body});
};

/**
 * Update unit
 * @param id : unit id
 * @param body : params
 * @returns {*}
 */
export const editItemUnit = body => {
  return Request.put({path: `units/${body.id}`, body});
};

/**
 * Remove unit
 * @param id : unit id
 * @returns {*}
 */
export const removeItemUnit = id => {
  return Request.delete({path: `units/${id}`});
};
