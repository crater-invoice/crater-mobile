import {INavigation} from '@/interfaces';

export interface IProps {
  /**
   * It is a create screen view.
   */
  isCreateScreen: boolean;

  /**
   * Id of the current user.
   */
  id: string;

  /**
   * Dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * It is a update screen view.
   */
  isEditScreen: boolean;

  /**
   * If true the user will be able to update the current role data.
   */
  isAllowToEdit: boolean;

  /**
   * An array of objects with data for each customer.
   */
  customers: Array<any>;

  /**
   * An action to return a list of customer.
   */
  fetchCustomers?: () => void;

  /**
   * Custom-Fields created by user.
   */
  customFields: any;

  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * An array of objects with data for each category.
   */
  categories: Array<any>;

  /**
   * An action to return a list of categories.
   */
  fetchCategories: () => void;

  /**
   * Gets form data.
   */
  formValues: any;

  /**
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * The loading indicator for the button.
   */
  isDeleting: boolean;

  /**
   * If true the user will be able to remove the current role.
   */
  isAllowToDelete: boolean;

  /**
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit: (fun: object) => any;

  /**
   * Route props for params.
   */
  route: Object<any>;

  /**
   * End point URL for download the receipt.
   */
  endpointURL: String;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;

  /**
   * An Object with data of current currency.
   */
  currency: Object;

  /**
   * File for receipt.
   */
  attachmentReceipt: any;

  /**
   * URL of receipt.
   */
  imageUrl: String;

  /**
   * The loading indicator for the file picker.
   */
  fileLoading: Boolean;

  /**
   * An Object with data of current customer.
   */
  customer: Object<any>;

  /**
   * File type of receipt.
   */
  fileType: String;

  /**
   * The Exchange rate field, displayed if the customer currency and base currency are not the same.
   */
  hasExchangeRate: boolean;

  /**
   * The Exchange rate refresh button, displayed if the provider exist for current currency .
   */
  hasProvider: boolean;
}
