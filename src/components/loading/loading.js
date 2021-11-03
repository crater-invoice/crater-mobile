import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';
import {colors} from '@/styles';

interface IProps {
  /**
   * Size of the indicator.
   * Small has a height of 20, large has a height of 36.
   *
   * enum('small', 'large')
   */
  size?: number | 'small' | 'large' | undefined;

  /**
   * The foreground color of the spinner (default is gray).
   */
  color?: string;

  /**
   * Styling for the loader container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export const Loading = ({size = 'large', color, style, theme}: IProps) => (
  <ActivityIndicator
    size={size}
    style={{flex: 1, ...style}}
    color={
      color
        ? color
        : theme?.mode === 'light'
        ? colors.veryDarkGray
        : colors.white
    }
  />
);
