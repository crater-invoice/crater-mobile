import {Dimensions} from 'react-native';
import {css} from 'styled-components/native';

const {width, height} = Dimensions.get('window');
const realWidth = height > width ? width : height;

export const normalize = size => Math.round((size * realWidth) / 375);

export const generateSize = size => css`
  font-size: ${size};
`;

export const fontSizes = {
  h6: generateSize(normalize(12)),

  h5: generateSize(normalize(14)),

  h4: generateSize(normalize(16)),

  mediumSize: generateSize(normalize(18)),

  h3: generateSize(normalize(22)),

  bigMediumSize: generateSize(normalize(24)),

  h2: generateSize(normalize(32)),

  h1: generateSize(normalize(36)),

  biggestSize: generateSize(normalize(48))
};
