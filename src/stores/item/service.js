import {pick} from 'lodash';
import * as queryString from 'query-string';
import Request from '@/utils/request';

/**
 * Fetch items
 * @param q : queryString
 * @returns {*}
 */
export const fetchItems = q =>
  Request.get(`/items?${queryString.stringify(q)}`);

/**
 * Add item
 * @param item : item data
 * @returns {*}
 */
export const addItem = item => {
  const data = pick(item, [
    'name',
    'description',
    'price',
    'unit_id',
    'taxes',
    'customFields'
  ]);
  return Request.post(`/items`, data);
};

/**
 * Update item
 * @param item
 * @returns {*}
 */
export const updateItem = item => Request.put(`/items/${item?.id}`, item);

/**
 * Remove item
 * @param id : item id
 * @returns {*}
 */
export const removeItem = ({id}) => Request.post(`/items/delete`, {ids: [id]});
