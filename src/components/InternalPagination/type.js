import {ITheme} from '@/interfaces';
export interface IProps {
  /**
   * Scroll-View style.
   */
  scrollViewStyle: Object;

  /**
   * Content-Container style.
   */
  contentContainerStyle: Object;

  /**
   * Hide the loader indicator.
   */
  hideLoader: Boolean;

  /**
   * Object of Search-Input props.
   */
  input: Object;

  /**
   * Compare key of an object for current selected-item placeholder value.
   */
  compareField: String;

  /**
   * An array of objects with data for each items.
   */
  items: Array;

  /**
   * Display value of an object for current selected-item placeholder value.
   */
  displayName: String;

  /**
   * Meta props for Search-Input field.
   */
  meta: Object;

  /**
   * Search Fields for internal search params.
   */
  searchFields: Object;

  /**
   * container style for Fake-input.
   */
  containerStyle: Object;

  /**
   * Label for Fake-input.
   */
  label: String;

  /**
   * Icon for Fake-input.
   */
  icon: any;

  /**
   * Placeholder for Fake-input.
   */
  placeholder: String;

  /**
   * Header props of Main-Layout.
   */
  headerProps: Object;

  /**
   * External Fake-input props.
   */
  baseSelectProps: Object;

  /**
   * External List-View props.
   */
  listViewProps: Object;

  /**
   * External Empty-Container props.
   */
  emptyContentProps: Object;

  /**
   * Search-Input props in Main-Layout.
   */
  searchInputProps: any;

  /**
   * A required value of Internal-Pagination filed.
   */
  isRequired: Boolean;

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
  visible: Boolean;

  /**
   * The bottom loading indicator for load data list.
   */
  bottomLoader: Boolean;

  /**
   * The loading indicator for load data list.
   */
  loading: Boolean;

  /**
   * The loading indicator while search.
   */
  searchLoading: Boolean;

  /**
   * Current searched text.
   */
  search: String;

  /**
   * Current selected-item placeholder for Fake-Input.
   */
  values: String;

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
