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
  loading: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * Gets form data.
   */
  formValues: any;

  /**
   * The isLoading for the loading.
   */
  isLoading: Boolean;

  /**
   *  customize settings data.
   */
  customizes: Object;
}

export interface IStates {
  /**
   * update auto generate.
   */
  isUpdateAutoGenerate: Boolean;

  /**
   * current active tab
   */
  activeTab: string;
}
