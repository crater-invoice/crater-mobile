import * as Font from 'expo-font';
import {Alert, Keyboard} from 'react-native';
import Poppins from '../assets/fonts/Poppins-Regular.ttf';
import PoppinsLight from '../assets/fonts/Poppins-Light.ttf';
import PoppinsMedium from '../assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsBold from '../assets/fonts/Poppins-Bold.ttf';

export const loadFonts = async ({afterLoad}) => {
  try {
    await Font.loadAsync({
      Poppins: Poppins,
      'Poppins-light': PoppinsLight,
      'Poppins-medium': PoppinsMedium,
      'Poppins-semi-bold': PoppinsSemiBold,
      'Poppins-bold': PoppinsBold
    });
  } catch (e) {}

  afterLoad?.();
};

export const MAX_LENGTH = 255;

// Alert
// -----------------------------------------
export const alertMe = ({
  title = '',
  desc = '',
  okText = 'OK',
  okPress = null,
  showCancel = false,
  cancelText = 'Cancel',
  cancelPress = null,
  autoClose = true
}) => {
  const cancelEvent = {
    text: cancelText,
    onPress: cancelPress ? cancelPress : () => {},
    style: 'cancel'
  };

  let events: any = [
    {
      text: okText,
      onPress: okPress ? okPress : () => {}
    }
  ];

  if (showCancel || cancelPress) events = [...events, cancelEvent];

  Alert.alert(title, desc, events, {cancelable: autoClose});
};

// Keyboard Type
// -----------------------------------------
export const KEYBOARD_TYPE = {
  DEFAULT: 'default',
  NUMERIC: 'numeric',
  DECIMAL: 'decimal-pad',
  EMAIL: 'email-address',
  PHONE: 'phone-pad',
  URL: 'url'
};

// Field Is Fillable ?
// -----------------------------------------
export const hasValue = field => {
  return field !== null && typeof field !== 'undefined';
};

export const hasLength = field => {
  return field && field.length !== 0 && typeof field === 'object';
};

export const isArray = fields => hasValue(fields) && hasLength(fields);

export const isEmpty = fields => !hasValue(fields) || !hasLength(fields);

export const hasObjectLength = field => {
  return field && Object.keys(field).length !== 0;
};

export const isBooleanTrue = value => value && (value === 'YES' || value === 1);

export const hasTextLength = string => {
  return hasValue(string) && string.length !== 0;
};

export function dismissKeyboard() {
  Keyboard.dismiss();
}

export function toObject(arr) {
  if (isEmpty(arr)) {
    return {};
  }

  let output = {};

  const objects = Object.assign({}, arr);
  for (const key in objects) {
    output = {...objects[key]};
  }

  return output;
}
