import {SET_MAIL_CONFIGURATION} from '@/constants';
import {
  MORE_TRIGGER_SPINNER,
  GENERATE_REPORT,
  GET_MAIL_CONFIGURATION
} from '../constants';

export const moreTriggerSpinner = payload => ({
  type: MORE_TRIGGER_SPINNER,
  payload
});

export const generateReport = payload => ({
  type: GENERATE_REPORT,
  payload
});

export const getMailConfiguration = (payload = {}) => ({
  type: GET_MAIL_CONFIGURATION,
  payload
});

export const setMailConfiguration = (payload = {}) => ({
  type: SET_MAIL_CONFIGURATION,
  payload
});
