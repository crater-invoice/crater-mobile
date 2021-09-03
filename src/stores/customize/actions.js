import {SET_SETTINGS} from '@/constants';
import * as TYPES from './types';

export const settingsTriggerSpinner = payload => ({
  type: TYPES.SETTINGS_TRIGGER_SPINNER,
  payload
});

export const getCustomizeSettings = (payload = {}) => ({
  type: TYPES.GET_CUSTOMIZE_SETTINGS,
  payload
});

export const setCustomizeSettings = (payload = {}) => ({
  type: TYPES.SET_CUSTOMIZE_SETTINGS,
  payload
});

export const editCustomizeSettings = (payload = {}) => ({
  type: TYPES.EDIT_CUSTOMIZE_SETTINGS,
  payload
});

export const editSettingItem = payload => ({
  type: TYPES.EDIT_SETTING_ITEM,
  payload
});
