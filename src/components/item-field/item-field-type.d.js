import {ITheme, INavigation} from '@/interfaces';

export interface IProps {
  /**
   * A function for change the form value.
   */
  setFormField?: () => void;

  /**
   * If true the user will be able to update the current item data.
   */
  isAllowToEdit: boolean;

  /**
   * Name of current screen.
   */
  screen: string;

  /**
   * An array of objects with data for selected items.
   */
  selectedItems: Object;

  /**
   * An array of objects with data for each item.
   */
  items: Array<any>;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * An Object with data of current Currency.
   */
  currency: Object;

  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * Is field is disabled.
   */
  disabled: boolean;

  /**
   * Discount per item.
   */
  discount_per_item: boolean;

  /**
   *  Tax per item.
   */
  tax_per_item: boolean;
}
