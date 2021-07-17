import Request from '@/api/request';

/**
 * Fetch roles
 * @returns {*}
 */
export const fetchRoles = () => {
  return Request.get({path: `roles`});
};

/**
 * Fetch single role
 * @param id : role id
 * @returns {*}
 */
export const fetchSingleRole = id => {
  return Request.get({path: `roles/${id}`});
};

/**
 * Fetch permissions
 * @returns {*}
 */
export const fetchPermissions = () => {
  return Request.get({path: `abilities`});
};

/**
 * Add role
 * @param body : params
 * @returns {*}
 */
export const addRole = body => {
  return Request.post({path: `roles`, body});
};
