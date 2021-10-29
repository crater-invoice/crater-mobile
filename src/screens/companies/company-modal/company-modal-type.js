import {INavigation, ITheme} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * Current navigation object values.
   */
  route: any;

  /**
   * An array of objects with data for each company.
   */
  companies: Array<any>;

  /**
   * Current selected company.
   */
  selectedCompany: any;
}

export interface IStates {
  /**
   * If true, a company model shows a list of companies otherwise hide.
   */
  visible: boolean;
}
