import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Label of checkbox view.
   */
  label: string;

  /**
   * Heading of checkbox view.
   */
  hint?: string;

  /**
   * Styling for main container.
   */
  containerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the hint.
   */
  hintStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the label.
   */
  labelStyle?: StyleProp<ViewStyle> | any;

  /**
   * Redux form built-in input events.
   */
  input?: any;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onChangeCallback?: () => void;

  /**
   * Additional props to pass to the CheckBox.
   */
  checkBoxProps?: any;

  /**
   * Disables the checkbox field
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
}
