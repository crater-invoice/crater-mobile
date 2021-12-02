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
  handleSubmit: (fun: object) => any;

  /**
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * The loading indicator for the button.
   */
  isDeleting: boolean;

  /**
   * Id of the current note.
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
   * If true the user will be able to update the current note data.
   */
  isAllowToEdit: boolean;

  /**
   * If true the user will be able to remove the current note.
   */
  isAllowToDelete: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * The form data to previously initialized values.
   */
  formValues: any;

  /**
   * Current navigation object values.
   */
  route: any;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;
}
