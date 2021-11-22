import {INavigation} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit: (fun: object) => any;

  /**
   * dispatch change action.
   */

  dispatch: (fun: object) => void;

  /**
   * Route props for params.
   */
  route: Object<any>;

  /**
   * An array of objects with data for each expense.
   */
  expenses: Array<any>;
}

export interface IStates {
  /**
   * Search roles in list data.
   */
  search: string;
}
