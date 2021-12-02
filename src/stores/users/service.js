import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch users
 * @param q : queryString
 * @returns {*}
 */
export const fetchUsers = q => {
  return Request.get(`/users?${queryString.stringify(q)}`);
};

/**
 * Fetch single user
 * @param id : user id
 * @returns {*}
 */
export const fetchSingleUser = id => {
  return Request.get(`/users/${id}`);
};

/**
 * Add user
 * @param data
 * @returns {*}
 */
export const addUser = data => {
  return Request.post(`/users`, data);
};

/**
 * Update user
 * @param id : user id
 * @param data
 * @returns {*}
 */
export const updateUser = (id, data) => {
  return Request.put(`/users/${id}`, data);
};

/**
 * Remove user
 * @param id : user id
 * @returns {*}
 */
export const removeUser = id => {
  return Request.post(`/users/delete`, {users: [id]});
};
