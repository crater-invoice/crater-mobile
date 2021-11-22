import Request from 'utils/request';

/**
 * Login user
 * @param data
 * @returns {*}
 */
export const login = data => {
  return Request.post('/auth/login', data);
};

/**
 * Send recovery mail
 * @param email
 * @returns {*}
 */
export const sendRecoveryEmail = email => {
  return Request.post('/auth/password/email', {email});
};
