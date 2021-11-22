import {INavigation} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * An array of objects with data for each customer.
   */
  customers: Array<any>;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * Current navigation object values.
   */
  route: any;

  /**
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit: (fun: object) => any;

  /**
   * The form data to previously initialized values.
   */
  formValues: any;
}

export interface IStates {
  /**
   * Search customer in list data.
   */
  search: string;
}
