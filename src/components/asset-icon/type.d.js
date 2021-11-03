import {StyleProp, ViewStyle} from 'react-native';

export interface IProps {
  /**
   * Name of font awesome icon.
   */
  name?: string;

  /**
   * Size of font awesome icon.
   */
  size?: number;

  /**
   * Whether to check that is icon solid or outline.
   */
  solid?: boolean;

  /**
   * Color of font awesome icon.
   */
  color?: string;

  /**
   * Styling for the icon container.
   */
  style?: StyleProp<ViewStyle> | any;
}
