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
   * Additional props to pass to the ListView.
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
   * Additional props to pass to the BottomAction.
   */
  bottomAction?: any;

  /**
   * Additional props to pass to the SearchBar.
   */
  searchInputProps?: any;

  /**
   * Additional props to pass to the SearchTextInput.
   */
  searchFieldProps?: any;

  /**
   * If true, show pagination list view.
   */
  isPagination?: boolean;

  /**
   * Additional props to pass to the InfiniteScrollView.
   */
  infiniteScrollProps?: any;

  /**
   * Additional props to pass to the SearchView.
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
