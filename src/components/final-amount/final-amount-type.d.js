import {ITheme, INavigation} from '@/interfaces';

export type IProps = {
  /**
   * An Object with data of current Currency.
   */
  currency: Object,

  /**
   * If true the user will be able to update the current role data.
   */
  isAllowToEdit: boolean,

  /**
   * Gets form data.
   */
  formValues: any,

  /**
   * An array of objects with data for each tax.
   */
  taxTypes?: Array<any>,

  /**
   * An action to return a list of tax.
   */
  fetchTaxes?: () => void,

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme,

  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation,

  /**
   * Discount per item.
   */
  discount_per_item: boolean,

  /**
   *  Tax per item.
   */
  tax_per_item: boolean
};
