import {isRTL} from '@/utils';

export const ICONS = {
  LEFT_LONG: 'long-arrow-alt-left',
  RIGHT: 'angle-right',
  PAINT: 'palette'
};

export const ARROW_ICON = isRTL()
  ? 'long-arrow-alt-right'
  : 'long-arrow-alt-left';
