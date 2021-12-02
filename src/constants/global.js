import {Alert} from 'react-native';

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

export const isBooleanTrue = value =>
  value && (value === 'YES' || value === 1 || value === true);

export const hasTextLength = string => {
  return hasValue(string) && string.length !== 0;
};

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

export const hitSlop = (top, left, bottom, right) => ({
  top,
  left,
  bottom,
  right
});
