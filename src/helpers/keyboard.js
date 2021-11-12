import {Keyboard} from 'react-native';

export function dismissKeyboard() {
  Keyboard.dismiss();
}

export const keyboardType = {
  DEFAULT: 'default',
  NUMERIC: 'numeric',
  DECIMAL: 'decimal-pad',
  EMAIL: 'email-address',
  PHONE: 'phone-pad',
  URL: 'url'
};

export const keyboardReturnKeyType = {
  DEFAULT: 'default',
  GO: 'go',
  GOOGLE: 'google',
  NEXT: 'next',
  SEARCH: 'search',
  SEND: 'send',
  DONE: 'done'
};
