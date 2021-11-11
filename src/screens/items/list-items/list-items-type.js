import {ITheme, INavigation} from '@/interfaces';

export interface IProps {
  /**
   * If true the user will be able to update the current note data.
   */
  isAllowToEdit: boolean;

  /**
   * An Object with data of current Currency.
   */
  currency: Object;

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
   * The form data to previously initialized values.
   */
  formValues: Object<any>;

  /**
   *  Tax per item.
   */
  tax_per_item: boolean;

  /**
   * Discount per item.
   */
  discount_per_item: boolean;

  /**
   * An array of objects with data for each item.
   */
  items: Array<any>;

  /**
   * Route props for params.
   */
  route: Object<any>;
}

export interface IStates {
  /**
   * Search roles in list data.
   */
  search: string;
}
