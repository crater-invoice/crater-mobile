import {INavigation, ITheme} from '@/interfaces';

export interface IProps {
  /**
   * An Object with data of current Currency.
   */
  currency: any;

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
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

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
   * An array of objects with data for selected items.
   */
  selectedItems: Array<any>;

  /**
   * An array of objects with data for each items.
   */

  items: Array<any>;

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
   * An array of status.
   */
  statusList: Array<any>;

  /**
   * An array of objects with data for each note.
   */
  notes: Array<any>;

  /**
   * An action to return a list of notes.
   */
  fetchNotes: () => void;

  /**
   * An array of objects with data for each template.
   */
  estimateTemplates: Array<any>;

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
   * The loading indicator content loading.
   */
  withLoading: boolean;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;

  /**
   * An Object with data of current Currency.
   */
  currency: Object;

  /**
   * The Exchange rate field, displayed if the customer currency and base currency are not the same.
   */
  hasExchangeRate: boolean;

  /**
   * The Exchange rate refresh button, displayed if the provider exist for current currency .
   */
  hasProvider: boolean;
}
