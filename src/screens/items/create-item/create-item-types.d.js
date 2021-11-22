import {ITheme, INavigation} from '@/interfaces';

export interface IProps {
  /**
   * Name of current screen.
   */
  screen: string;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit: (fun: object) => any;

  /**
   * The loading indicator for the button.
   */
  loading: boolean;

  /**
   * The form data to previously initialized values.
   */
  formValues: Object<any>;

  /**
   * Initialize the form data.
   */
  initialValues: any;

  /**
   * Discount per item.
   */
  discountPerItem: boolean;

  /**
   * Id of the current Item.
   */
  itemId: string;

  /**
   * An array of objects with data for each tax.
   */
  taxTypes?: Array<any>;

  /**
   *  Tax per item.
   */
  taxPerItem: boolean;

  /**
   * An array of objects with data for each unit.
   */
  units: Array<any>;

  /**
   * An action to return a list of item-units.
   */
  fetchItemUnits?: () => void;

  /**
   * An action to return a list of tax.
   */
  fetchTaxes?: () => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * Route props for params.
   */
  route: Object<any>;

  /**
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * The loading indicator for the button.
   */
  isDeleting: boolean;

  /**
   * It is a create screen view.
   */
  isCreateScreen: boolean;
}
