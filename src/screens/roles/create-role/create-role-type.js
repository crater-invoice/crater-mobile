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
   * Initialize the form data.
   */
  initialValues: any;

  /**
   * Id of the current role.
   */
  id: string;

  /**
   * It is a create screen view.
   */
  isCreateScreen: boolean;

  /**
   * It is a update screen view.
   */
  isEditScreen: boolean;

  /**
   * If true the user will be able to update the current role data.
   */
  isAllowToEdit: boolean;

  /**
   * If true the user will be able to remove the current role.
   */
  isAllowToDelete: boolean;

  /**
   * An array of objects with data for each permission.
   */
  permissions: Array<any>;

  /**
   * An array of objects with data for each formatted permission.
   */
  formattedPermissions: Array<any>;

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
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * The loading indicator for the button.
   */
  isDeleting: boolean;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;
}
