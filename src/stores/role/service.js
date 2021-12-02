import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch roles
 * @param q : queryString
 * @returns {*}
 */
export const fetchRoles = q => {
  return Request.get(`/roles?${queryString.stringify(q)}`);
};

/**
 * Fetch single role
 * @param id : role id
 * @returns {*}
 */
export const fetchSingleRole = id => {
  return Request.get(`/roles/${id}`);
};

/**
 * Fetch permissions
 * @returns {*}
 */
export const fetchPermissions = () => {
  return Request.get(`/abilities`);
};

/**
 * Add role
 * @param data
 * @returns {*}
 */
export const addRole = data => {
  return Request.post(`/roles`, data);
};

/**
 * Update role
 * @param id : role id
 * @param data
 * @returns {*}
 */
export const updateRole = (id, data) => {
  return Request.put(`/roles/${id}`, data);
};

/**
 * Remove role
 * @param id : role id
 * @returns {*}
 */
export const removeRole = id => {
  return Request.delete(`/roles/${id}`);
};
