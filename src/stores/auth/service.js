import Request from 'utils/request';

/**
 * Login user
 * @param body
 * @returns {*}
 */
export const login = body => {
  return Request.post({
    path: 'auth/login',
    body,
    isAuthRequired: false
  });
};

/**
 * Send recovery mail
 * @param email
 * @returns {*}
 */
export const sendRecoveryEmail = email => {
  return Request.post({
    path: 'auth/password/email',
    body: {email},
    isAuthRequired: false
  });
};
