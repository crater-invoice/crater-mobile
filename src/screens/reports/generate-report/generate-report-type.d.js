import {INavigation} from '@/interfaces';

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
   * Current selected company.
   */
  selectedCompany: any;

  /**
   * Starting and ending month of Fiscal year.
   */
  fiscalYear: String;

  /**
   * Type of current Active Report.
   */
  type: String;
}

export interface IStates {
  /**
   * Object of start date data for report.
   */
  displayFromDate: Object<any>;

  /**
   * Object of end date data for report.
   */
  displayToDate: Object<any>;
}
