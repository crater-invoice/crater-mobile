import {StyleProp, ViewStyle} from 'react-native';

export interface IProps {
  /**
   * Name of SVG icon.
   */
  name: string;

  /**
   * Color of fillable SVG icon.
   */
  fill?: string;

  /**
   * Width of SVG icon.
   */
  width?: number | string;

  /**
   * Height of SVG icon.
   */
  height?: number | string;

  /**
   * Styling for the icon container.
   */
  style?: StyleProp<ViewStyle> | any;
}
