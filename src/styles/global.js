import {defineSize, SCREEN_WIDTH} from '@/helpers/size';
import {fonts} from './fonts';

export const headerTitle = ({
  marginLeft = -7,
  marginRight = -12,
  theme = null
}) => {
  return {
    marginLeft: defineSize(marginLeft, marginLeft, marginLeft, 0),
    marginRight: defineSize(marginRight, marginRight, marginRight, 0),
    textAlign: 'center',
    fontFamily: theme?.mode === 'dark' ? fonts.medium : fonts.regular,
    textAlign: 'left'
  };
};

export const itemsDescriptionStyle = (widthMinus = 43) => {
  return {
    width: SCREEN_WIDTH - widthMinus,
    textAlign: 'justify'
  };
};
