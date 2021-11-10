import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetch items
 * @param q : queryString
 * @returns {*}
 */
export const fetchItems = q =>
  Request.get({path: `items?${queryString.stringify(q)}`});

/**
 * Add item
 * @param item : item data
 * @returns {*}
 */
export const addItem = item => {
  const {price, name, description, taxes, unit_id} = item;
  const body = {name, description, price, unit_id, taxes};
  return Request.post({path: `items`, body});
};

/**
 * Update item
 * @param item : item data
 * @returns {*}
 */
export const updateItem = item =>
  Request.put({path: `items/${item?.item_id}`, body: item});

/**
 * Remove item
 * @param id : item id
 * @returns {*}
 */
export const removeItem = body => Request.post({path: `items/delete`, body});
