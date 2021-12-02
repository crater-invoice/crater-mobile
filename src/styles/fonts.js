import {Dimensions} from 'react-native';
import {css} from 'styled-components/native';
import * as Font from 'expo-font';
import Poppins from '../assets/fonts/Poppins-Regular.ttf';
import PoppinsLight from '../assets/fonts/Poppins-Light.ttf';
import PoppinsMedium from '../assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsBold from '../assets/fonts/Poppins-Bold.ttf';

const {width, height} = Dimensions.get('window');
const realWidth = height > width ? width : height;

export const normalize = size => Math.round((size * realWidth) / 375);

export const generateSize = size =>
  css`
    font-size: ${size};
  `;

export const fontSizes = {
  h1: normalize(36),

  h2: normalize(32),

  h3: normalize(22),

  h4: normalize(16),

  h5: normalize(14),

  h6: normalize(12),

  mediumSize: normalize(18),

  bigMediumSize: normalize(24),

  biggestSize: normalize(48)
};

export const fonts = {
  regular: 'Poppins',
  light: 'Poppins-light',
  medium: 'Poppins-medium',
  semiBold: 'Poppins-semi-bold',
  bold: 'Poppins-bold'
};

export const loadFonts = async onLoad => {
  await Font.loadAsync({
    Poppins: Poppins,
    'Poppins-light': PoppinsLight,
    'Poppins-medium': PoppinsMedium,
    'Poppins-semi-bold': PoppinsSemiBold,
    'Poppins-bold': PoppinsBold
  });

  onLoad?.();
};
