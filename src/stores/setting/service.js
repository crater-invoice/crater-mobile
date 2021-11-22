import Request from 'utils/request';

/**
 * Fetch mail configuration
 * @returns {*}
 */
export const fetchMailConfig = () => {
  return Request.get(`/mail/config`);
};
