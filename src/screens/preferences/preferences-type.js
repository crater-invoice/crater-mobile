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
   * The loading indicator for updating preferences.
   */
  isSaving: boolean;

  /**
   * Initialize the form data.
   */
  initialValues: any;

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
   * An array of objects with data for each currencyList.
   */
  currencyList: Array<any>;

  /**
   * An array of objects with data for each languagesList.
   */
  languagesList: Array<any>;

  /**
   * An array of objects with data for each timezoneList.
   */
  timezoneList: Array<any>;

  /**
   * An array of objects with data for each dateFormatList.
   */
  dateFormatList: Array<any>;

  /**
   * An array of objects with data for each fiscalYearLst.
   */
  fiscalYearLst: Array<any>;

  /**
   * An array of objects with data for each retrospectiveEditsList.
   */
  retrospectiveEditsList: Array<any>;

  /**
   * Gets form data.
   */
  formValues: any;
}

export interface IStates {
  /**
   * The loading indicator while load initial data.
   */
  isFetchingInitialData: any;
}
