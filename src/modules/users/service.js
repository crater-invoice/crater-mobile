import Request from '@/api/request';

/**
 * Fetch users
 * @returns {*}
 */
export const fetchUsers = () => {
    return Request.get({ path: `users` });
};

/**
 * Fetch single user
 * @param id : user id
 * @returns {*}
 */
export const fetchSingleUser = id => {
    return Request.get({ path: `users/${id}` });
};

/**
 * Add user
 * @param body : params
 * @returns {*}
 */
export const addUser = body => {
    return Request.post({ path: `users`, body });
};

/**
 * Update user
 * @param id : user id
 * @param body : params
 * @returns {*}
 */
export const updateUser = (id, body) => {
    return Request.put({ path: `users/${id}`, body });
};

/**
 * Remove user
 * @param id : user id
 * @returns {*}
 */
export const removeUser = body => {
    return Request.post({ path: `users/delete`, body });
};
