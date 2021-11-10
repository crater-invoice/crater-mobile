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
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit?: (fun: object) => any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * The form data to previously initialized values.
   */
  initialData?: any;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  callback?: (callback: any) => void;

  /**
   * The billing address to previously initialized values.
   */
  billingAddress?: any;

  /**
   * If true, the current screen is initialized with billing type.
   */
  isBilling?: boolean;

  /**
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * An array of objects with data for each country.
   */
  countries?: Array<any>;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;

  /**
   * If true, the keyboard is visible.
   */
  isKeyboardVisible: boolean;
}
