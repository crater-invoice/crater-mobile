import * as types from './types';

export const settingsTriggerSpinner = payload => ({
  type: types.SETTINGS_TRIGGER_SPINNER,
  payload
});

export const getPaymentModes = (payload = {}) => ({
  type: types.GET_PAYMENT_MODES,
  payload
});

export const setPaymentModes = (payload = {}) => ({
  type: types.SET_PAYMENT_MODES,
  payload
});

export const setPaymentMode = (payload = {}) => ({
  type: types.SET_PAYMENT_MODE,
  payload
});

export const createPaymentMode = (payload = {}) => ({
  type: types.CREATE_PAYMENT_MODE,
  payload
});

export const editPaymentMode = (payload = {}) => ({
  type: types.EDIT_PAYMENT_MODE,
  payload
});

export const removePaymentMode = (payload = {}) => ({
  type: types.REMOVE_PAYMENT_MODE,
  payload
});
