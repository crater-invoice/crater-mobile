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
   * The form data to previously initialized values.
   */
  formValues: Object<any>;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit: (fun: object) => any;

  /**
   * Route props for params.
   */
  route: Object<any>;
}

export interface IStates {
  /**
   * Search roles in list data.
   */
  search: string;

  /**
   * Current Active tab.
   */
  activeTab: string;
}
