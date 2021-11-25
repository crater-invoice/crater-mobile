import {INavigation, ITheme} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * The URI to load in the `WebView`. Can be a local or remote file.
   */
  uri: string;

  /**
   * The HTTP Method to use. Defaults to GET if not specified.
   * NOTE: On Android, only GET and POST are supported.
   */
  method?: string;

  /**
   * The authenticated token of the current login user.
   */
  idToken: string;
}
