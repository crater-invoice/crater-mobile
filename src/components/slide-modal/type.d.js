import React from 'react';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * If true the modal is showing.
   */
  visible?: boolean;

  /**
   * A function to toggle modal visibility.
   */
  onToggle?: () => any;

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
   * An additional list view accessibility.
   */
  listViewProps?: Object;

  /**
   * If true, show default layout view.
   */
  defaultLayout?: boolean;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * An additional bottom action accessibility.
   */
  bottomAction?: any;

  /**
   * An additional search bar accessibility.
   */
  searchInputProps?: any;

  /**
   * An additional search bar field accessibility.
   */
  searchFieldProps?: any;

  /**
   * If true, show pagination list view.
   */
  isPagination?: boolean;

  /**
   * An additional list view accessibility.
   */
  infiniteScrollProps?: any;

  /**
   * An additional scroll-view accessibility.
   */
  scrollViewProps?: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  customView?: React.ReactNode | any;
}
