import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Redux form built-in input events.
   */
  input?: any;

  /**
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * Styling for the main container.
   */
  baseSelectContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Label of radio button group.
   */
  hint?: string;

  /**
   * Initialize the form data.
   */
  initialValue: any;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onChangeCallback?: (callback: any) => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * An array of objects with data for each option.
   * i.e. None, Fixed, Percentage.
   */
  options: Array<any>;

  /**
   * The ist of radio buttons return vertical.
   */
  isList: boolean;
}

export interface IStates {
  /**
   * Selected option value.
   */
  selected: string | boolean | undefined;
}
