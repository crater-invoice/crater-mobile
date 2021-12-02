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
   * An array of objects with data for each field.
   */
  customFields: Array<any>;

  /**
   * Selected company currency.
   */
  currency: any;

  /**
   * An array of objects with data for each currency.
   */
  currencies: Array<any>;

  /**
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * The loading indicator for the button.
   */
  isDeleting: boolean;

  /**
   * Id of the current customer.
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
   * If true the user will be able to update the current customer data.
   */
  isAllowToEdit: boolean;

  /**
   * If true the user will be able to remove the current customer.
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

  /**
   * If true, It is navigate from invoice.
   */
  hasRecordPayment: boolean;

  /**
   * An objects with data for selected payment invoice.
   */
  invoice: any;

  /**
   * An array of objects with data for each customer.
   */
  customers: Array<any>;

  /**
   * An array of objects with data for each payment mode.
   */
  paymentModes: Array<any>;

  /**
   * An array of objects with data for each payment invoice.
   */
  paymentInvoices: Array<any>;

  /**
   * An array of objects with data for each payment note.
   */
  notes: Array<any>;

  /**
   * An action to return a list of customer.
   */
  fetchCustomers?: () => void;

  /**
   * An action to return a list of payment mode.
   */
  fetchPaymentModes?: () => void;

  /**
   * An action to return a list of payment invoice.
   */
  fetchPaymentInvoices?: () => void;

  /**
   * An action to return a list of payment note.
   */
  fetchNotes?: () => void;
}

export interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  isFetchingInitialData: boolean;

  /**
   * Selected invoice data based on the current customer.
   */
  selectedInvoice: any;

  /**
   * Selected customer data.
   */
  selectedCustomer: any;

  /**
   * The Exchange rate field, displayed if the customer currency and base currency are not the same.
   */
  hasExchangeRate: boolean;

  /**
   * The Exchange rate refresh button, displayed if the provider exist for current currency .
   */
  hasProvider: boolean;

  /**
   * Due amount of current selected invoice.
   */
  due_amount: Number<any>;
}
