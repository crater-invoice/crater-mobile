import {Platform, Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export function isIPhoneX() {
  const {height, width} = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
}

export const isIosPlatform = Platform.OS === 'ios';

export const isAndroidPlatform = Platform.OS === 'android';

export const definePlatformParam = (ios, android) =>
  isIosPlatform ? ios : android;

export const defineLargeSizeParam = (large, normal) =>
  isIPhoneX() ? large : normal;

export const isMajorScreenHeight = SCREEN_HEIGHT >= 800;

export const isVerySmallScreen = SCREEN_WIDTH <= 340;

export const majorVersionIOS = parseInt(String(Platform.Version), 10);

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
