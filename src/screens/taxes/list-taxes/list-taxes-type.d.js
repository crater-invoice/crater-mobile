import {INavigation} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * An array of objects with data for each tax.
   */
  taxTypes: Array<any>;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * Current navigation object values.
   */
  route: any;
}

export interface IStates {
  /**
   * Search tax in list data.
   */
  search: string;
}
