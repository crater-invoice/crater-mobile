import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Scroll-View style.
   */
  scrollViewStyle: any;

  /**
   * Content-Container style.
   */
  contentContainerStyle: any;

  /**
   * Hide the loader indicator.
   */
  hideLoader: boolean;

  /**
   * Redux form built-in input events.
   */
  input?: any;

  /**
   * Compare key of an object for current selected-item placeholder value.
   */
  compareField: string;

  /**
   * An array of objects with data for each items.
   */
  items: Array;

  /**
   * Display value of an object for current selected-item placeholder value.
   */
  displayName: string;

  /**
   * Redux form built-in meta validation events.
   */
  meta?: any;

  /**
   * Search Fields for internal search params.
   */
  searchFields: any;

  /**
   * container style for Fake-input.
   */
  containerStyle: any;

  /**
   * Label for Fake-input.
   */
  label: string;

  /**
   * Icon for Fake-input.
   */
  icon: any;

  /**
   * Placeholder for Fake-input.
   */
  placeholder: string;

  /**
   * Header props of Main-Layout.
   */
  headerProps: any;

  /**
   * External Fake-input props.
   */
  baseSelectProps: any;

  /**
   * External List-View props.
   */
  listViewProps: any;

  /**
   * External Empty-Container props.
   */
  emptyContentProps: any;

  /**
   * Search-Input props in Main-Layout.
   */
  searchInputProps: any;

  /**
   * A required value of Internal-Pagination filed.
   */
  isRequired: boolean;

  /**
   * Custom View field exchange of Fake-input.
   */
  customView: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export interface IStates {
  /**
   * Is modal visible.
   */
  visible: boolean;

  /**
   * The bottom loading indicator for load data list.
   */
  bottomLoader: boolean;

  /**
   * The loading indicator for load data list.
   */
  loading: boolean;

  /**
   * The loading indicator while search.
   */
  searchLoading: boolean;

  /**
   * Current searched text.
   */
  search: string;

  /**
   * Current selected-item placeholder for Fake-Input.
   */
  values: string;

  /**
   * Current index of from total pages.
   */
  currentPage: Number;

  /**
   * An array of objects with data for each searched-items.
   */
  searchItems: Array;

  /**
   * An array of objects with data for each items with pagination.
   */
  itemList: Array;
}
