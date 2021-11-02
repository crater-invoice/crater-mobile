import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * An additional header accessibility.
   */
  headerProps?: any;

  /**
   * Invoked with the the change event as an argument when the search value changes.
   */
  onSearch?: (text: string) => void;

  /**
   * If false, hide the bottom border.
   */
  bottomDivider?: boolean;

  /**
   * If true, show search bar.
   */
  hasSearchField?: boolean;

  /**
   * A function to toggle filter visibility.
   */
  onToggleFilter?: () => any;

  /**
   * An additional filter accessibility.
   */
  filterProps?: any;

  /**
   * An additional field accessibility.
   */
  inputProps?: any;

  /**
   * Styling for divider container.
   */
  dividerStyle?: StyleProp<ViewStyle> | any;

  /**
   * An additional image loader accessibility.
   */
  loadingProps?: any;

  /**
   * An additional search bar field accessibility.
   */
  searchFieldProps?: any;

  /**
   * Styles for the container surrounding the main body.
   */
  bodyStyle?: StyleProp<ViewStyle> | any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * An additional bottom action accessibility.
   */
  bottomAction?: any;

  /**
   * An additional keyboard accessibility.
   */
  keyboardProps?: any;

  /**
   * An additional content props accessibility.
   */
  contentProps?: any;
}
