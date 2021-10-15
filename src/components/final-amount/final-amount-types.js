import {ITheme, INavigation} from '@/interfaces';

export type IProps = {
  /**
   * An array of objects with data for each tax.
   */
  taxTypes?: Array<any>,

  /**
   * An action to return a list of tax.
   */
  getTaxes?: () => void,

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
  discount_per_item: Boolean,

  /**
   *  Tax per item.
   */
  tax_per_item: Boolean
};
