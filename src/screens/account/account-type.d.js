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
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * An array of objects with data for each language.
   */
  languages: Array<any>;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;

  /**
   * The loading indicator for the button, displayed until the lgo is ready to be displayed.
   */
  fileLoading: boolean;

  /**
   * Url of user avatar.
   */
  avatar: string | null;

  /**
   * Url of uploaded user avatar.
   */
  avatarUrl: string | null;
}
