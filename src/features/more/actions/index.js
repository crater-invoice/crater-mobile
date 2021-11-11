import {SET_MAIL_CONFIGURATION} from '@/constants';
import {GET_MAIL_CONFIGURATION} from '../constants';

export const getMailConfiguration = (payload = {}) => ({
  type: GET_MAIL_CONFIGURATION,
  payload
});

export const setMailConfiguration = (payload = {}) => ({
  type: SET_MAIL_CONFIGURATION,
  payload
});
