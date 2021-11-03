import React from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * The name of the left icon.
   */
  leftIcon?: string;

  /**
   * The event called occurs when the left icon pressed.
   */
  leftIconPress?: () => void;

  /**
   * Title of header center label.
   */
  title?: string;

  /**
   * The name of the right icon.
   */
  rightIcon?: string;

  /**
   * The event called occurs when the right icon pressed.
   */
  rightIconPress?: () => void;

  /**
   * Determines the alignment of the title
   *
   * @default 'center'
   */
  placement?: 'left' | 'center' | 'right';

  /**
   * If true, apply the transparent styles.
   */
  transparent?: boolean;

  /**
   * Show the label on the right side instead of an icon.
   */
  rightIconHint?: string;

  /**
   * component title style
   */
  titleStyle?: StyleProp<TextStyle> | any;

  /**
   * Styling for the left icon container.
   */
  leftIconStyle?: StyleProp<ViewStyle> | any;

  /**
   * If false, hide the bottom border.
   */
  noBorder?: boolean;

  /**
   * If true, show primary background color in the left icon.
   */
  hasCircle?: boolean;

  /**
   * Additional props to pass to the RightIcon.
   */
  rightIconProps?: any;

  /**
   * Render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  rightComponent?: React.ReactNode | any;

  /**
   * Styling for the right side label container.
   */
  rightIconHintStyle?: any;

  /**
   * The event called occurs when the title pressed.
   */
  titleOnPress?: () => void;

  /**
   * Styling for main container
   */
  containerStyle?: StyleProp<ViewStyle> | any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * Current navigation object values.
   */
  route?: any;

  /**
   * The name of the left icon.
   */
  leftArrow: string;

  /**
   * Show filter view if is required.
   */
  filterProps: any;
}
