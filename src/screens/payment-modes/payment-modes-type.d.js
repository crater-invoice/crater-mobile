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
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit: (fun: object) => void;

  /**
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * The loading indicator for the button.
   */
  isDeleting: boolean;

  /**
   * Id of the current user.
   */
  userId: string;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * The form data to previously initialized values.
   */
  formData: any;

  /**
   * An array of objects with data for each payment-mode.
   */
  paymentModes: Array<any>;

  /**
   * Gets form data.
   */
  formValues: any;

  /**
   * An action to return a list of payment-modes.
   */
  fetchPaymentModes: () => void;
}
export interface IStates {
  /**
   * update auto generate.
   */
  isCreateMethod: boolean;
}
