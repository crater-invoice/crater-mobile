import React from 'react';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * Additional props to pass to the BottomAction.
   */
  bottomAction?: any;

  /**
   * Additional props to pass to the Keyboard.
   */
  keyboardProps?: any;

  /**
   * Additional props to pass to the ActivityIndicator.
   */
  loadingProps?: any;

  /**
   * Title of header label.
   */
  title?: string;

  /**
   * Sub title of header label.
   */
  'sub-title'?: string;
}
