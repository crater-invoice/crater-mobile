import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {IClass} from '@/interfaces';

export interface IProps {
  /**
   * Styling for the view container via class.
   * @see IClass
   */
  class?: IClass;

  /**
   * Styling for the view container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * Handle additional non-existing type.
   */
  [key: string]: string | number | any;

  /**
   * Handle the component will render or not.
   * @default true
   */
  show?: boolean;
}
