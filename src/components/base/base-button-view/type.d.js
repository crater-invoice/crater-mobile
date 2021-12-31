import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {IClass} from '@/interfaces';

export interface IProps {
  /**
   * Styling for the button container via class.
   * @see IClass
   */
  class?: IClass;

  /**
   * Styling for the button container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * Name of the button property.
   * @default TouchableOpacity
   */
  button?: any;

  /**
   * Size of the zoom animation view.
   */
  scale?: number;

  /**
   * Click action.
   */
  onPress?: () => void;

  /**
   * Handle additional non-existing type.
   */
  [key: string]: string | number | any;

  /**
   * Styling for the button outer view container via class.
   * @see IClass
   */
  'base-class'?: IClass;

  /**
   * Handle the component will render or not.
   * @default true
   */
  show?: boolean;
}
