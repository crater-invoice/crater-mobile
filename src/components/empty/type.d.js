import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Title of empty placeholder.
   */
  title?: string;

  /**
   * Description of empty placeholder.
   */
  description?: string;

  /**
   * Image of empty placeholder.
   */
  image?: string;

  /**
   * Title of empty placeholder button.
   */
  buttonTitle?: string;

  /**
   * An action to redirect a specific route.
   */
  buttonPress?: () => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * Current navigation object values.
   */
  route?: any;
}
