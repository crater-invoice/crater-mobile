import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch categories
 * @param q : queryString
 * @returns {*}
 */
export const fetchCategories = q => {
  return Request.get({path: `categories?${queryString.stringify(q)}`});
};

/**
 * Fetch single category
 * @param id : category id
 * @returns {*}
 */
export const fetchSingleCategory = id => {
  return Request.get({path: `categories/${id}`});
};

/**
 * Add category
 * @param body : params
 * @returns {*}
 */
export const addCategory = body => {
  return Request.post({path: `categories`, body});
};

/**
 * Update category
 * @param id : category id
 * @param body : params
 * @returns {*}
 */
export const updateCategory = (id, body) => {
  return Request.put({path: `categories/${id}`, body});
};

/**
 * Remove category
 * @param id : category id
 * @returns {*}
 */
export const removeCategory = id => {
  return Request.delete({path: `categories/${id}`});
};
