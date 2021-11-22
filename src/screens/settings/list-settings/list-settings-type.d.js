import {INavigation, ITheme} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation?: INavigation;

  /**
   * dispatch change action.
   */
  dispatch?: (fun: object) => void;

  /**
   * Current navigation object values.
   */
  route?: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
}
