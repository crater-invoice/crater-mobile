import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch categories
 * @param q : queryString
 * @returns {*}
 */
export const fetchCategories = q => {
  return Request.get(`/categories?${queryString.stringify(q)}`);
};

/**
 * Fetch single category
 * @param id : category id
 * @returns {*}
 */
export const fetchSingleCategory = id => {
  return Request.get(`/categories/${id}`);
};

/**
 * Add category
 * @param data
 * @returns {*}
 */
export const addCategory = data => {
  return Request.post(`/categories`, data);
};

/**
 * Update category
 * @param id : category id
 * @param data
 * @returns {*}
 */
export const updateCategory = (id, data) => {
  return Request.put(`/categories/${id}`, data);
};

/**
 * Remove category
 * @param id : category id
 * @returns {*}
 */
export const removeCategory = id => {
  return Request.delete(`/categories/${id}`);
};
