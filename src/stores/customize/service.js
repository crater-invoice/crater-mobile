import Request from '@/utils/request';
import * as types from './types';

/**
 * fetch customization
 * @returns {*}
 */
export const fetchCustomizeSettings = () => {
  return Request.get({
    path: `company/settings`,
    axiosProps: {
      params: {settings: types.COMPANY_SETTINGS_TYPE}
    }
  });
};

/**
 * Update customization
 * @param body : params
 * @returns {*}
 */
export const updateCustomizeSettings = body => {
  return Request.post({path: `company/settings`, body});
};
