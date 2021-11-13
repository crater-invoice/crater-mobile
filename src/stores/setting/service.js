import Request from 'utils/request';

/**
 * Fetch mail configuration
 * @returns {*}
 */
export const FetchMailConfiguration = () => {
  return Request.get({path: `me`});
};
