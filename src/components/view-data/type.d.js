import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Label value of field.
   */
  label?: string;

  /**
   * Value of field.
   */
  values?: string;

  /**
   * Is field with pair.
   */
  inPairs?: boolean;

  /**
   * An objects with data of field.
   */
  first?: any;

  /**
   * An objects with data of field.
   */
  second?: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}
