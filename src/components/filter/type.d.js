import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * If true the modal is showing.
   */
  visible?: boolean;

  /**
   * A function to toggle modal visibility.
   */
  onToggle?: () => any;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onSubmitFilter: () => void;

  /**
   * Additional props to pass to the Header.
   */
  headerProps: any;

  /**
   * An array of objects with data for each input field.
   */
  inputFields: Array<any>;

  /**
   * An array of objects with data for each dropdown field.
   */
  dropdownFields: Array<any>;

  /**
   * An array of objects with data for each select field.
   */
  selectFields: Array<any>;

  /**
   * An array of objects with data for each date field.
   */
  datePickerFields: Array<any>;

  /**
   * An action to reset the current form values.
   */
  onResetFilter: () => void;

  /**
   * All props of the parent component.
   */
  clearFilter: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export interface IStates {
  /**
   * If true the modal is showing.
   */
  visible: boolean;

  /**
   * The number of counts for applying filter fields.
   */
  counter: number;

  /**
   * If true, the keyboard is visible.
   */
  isKeyboardVisible: boolean;
}
