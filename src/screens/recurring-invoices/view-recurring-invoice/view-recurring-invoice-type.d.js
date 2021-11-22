import {INavigation, ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Id of the current user.
   */
  id: string;

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
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * Route props for params.
   */
  route: Object<any>;

  /**
   * An array of objects with data for selected items.
   */
  selectedItems: Array<any>;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;

  /**
   * An objects with data of selected items.
   */
  data: Object<any>;
}
