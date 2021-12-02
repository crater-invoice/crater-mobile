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
   * Additional props to pass to the Header.
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
   * Additional props to pass to the Filter.
   */
  filterProps?: any;

  /**
   * Additional props to pass to the TextInput.
   */
  inputProps?: any;

  /**
   * Styling for divider container.
   */
  dividerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Additional props to pass to the ActivityIndicator.
   */
  loadingProps?: any;

  /**
   * Additional props to pass to the SearchBar.
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
}
