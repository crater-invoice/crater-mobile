import {Dimensions} from 'react-native';
import {isIPhoneX} from './platform';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const defineLargeSizeParam = (large, normal) =>
  isIPhoneX() ? large : normal;

export const isMajorScreenHeight = SCREEN_HEIGHT >= 800;

export const isVerySmallScreen = SCREEN_WIDTH <= 340;

export const defineSize = (small, medium, large, extraLarge) => {
  if (isIPhoneX()) {
    return extraLarge;
  }

  if (isMajorScreenHeight) {
    return large;
  }

  if (isVerySmallScreen) {
    return small;
  }

  return medium;
};
