import React, {Component} from 'react';
import {Field, change, initialize} from 'redux-form';
import moment from 'moment';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-payment-type.d';
import {DATE_FORMAT, hasObjectLength} from '@/constants';
import {keyboardType} from '@/helpers/keyboard';
import {secondaryHeader} from 'utils/header';
import {CREATE_PAYMENT_FORM} from 'stores/payment/types';
import {dismissRoute, routes} from '@/navigation';
import {getApiFormattedCustomFields, showNotification} from '@/utils';
import options from './payment-dropdown';
import {
  CustomerSelectModal,
  InvoiceSelectModal,
  PaymentModeSelectModal
} from '@/select-modal';
import {
  BaseButton,
  BaseButtonGroup,
  BaseInput,
  CustomField,
  DefaultLayout,
  SendMail,
  BaseDatePicker,
  View as CtView,
  Notes,
  ExchangeRateField
} from '@/components';
import {
  addPayment,
  updatePayment,
  fetchSinglePayment,
  fetchPaymentInitialDetails,
  fetchNextPaymentNumber
} from 'stores/payment/actions';
import {
  checkExchangeRate,
  checkExchangeRateProvider
} from 'stores/common/actions';

export default class CreatePayment extends Component<IProps, IStates> {
  invoiceReference: any;
  sendMailRef: any;
  customerReference: any;
  constructor(props) {
    super(props);
    this.state = {
      isFetchingInitialData: true,
      selectedInvoice: null,
      due_amount: null,
      selectedCustomer: null,
      hasExchangeRate: false,
      hasProvider: false
    };
    this.invoiceReference = React.createRef();
    this.sendMailRef = React.createRef();
    this.customerReference = React.createRef();
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isEditScreen, id, dispatch} = this.props;

    if (isEditScreen) {
      dispatch(fetchSinglePayment(id, this.setInitialData));
      return;
    }

    dispatch(
      fetchPaymentInitialDetails(payment_number =>
        this.setInitialData({payment_number})
      )
    );
  };

  setInitialData = async res => {
    const {dispatch, hasRecordPayment, invoice, route} = this.props;
    let customerCurrency = res?.customer?.currency;

    let data = {
      payment_date: moment(),
      ...res
    };

    await this.setState({
      selectedCustomer: data?.customer,
      selectedInvoice: data?.invoice,
      due_amount: data?.invoice?.due_amount
    });

    if (hasRecordPayment) {
      data = {
        ...data,
        customer_id: invoice?.customer_id,
        invoice_id: invoice?.id,
        amount: invoice?.due?.due_amount,
        customer: invoice?.customer,
        invoice: {invoice_number: invoice?.number}
      };
      customerCurrency = invoice?.customer?.currency;
      this.fetchNextPaymentNumber(invoice?.customer_id);
      await this.setState({
        selectedCustomer: invoice?.customer,
        selectedInvoice: invoice?.due,
        due_amount: invoice?.due_amount
      });
    }

    const customer = route?.params?.customer;
    if (customer) {
      data = {...data, customer_id: customer.id};
      await this.setState({selectedCustomer: customer});
      customerCurrency = customer.currency;
      this.fetchNextPaymentNumber(customer.id);
    }
    customerCurrency &&
      (await this.checkExchangeRateProvider(customerCurrency));
    dispatch(initialize(CREATE_PAYMENT_FORM, data));
    this.setState({isFetchingInitialData: false});
  };

  onSave = values => {
    const {id, navigation, dispatch, route, hasRecordPayment} = this.props;
    const {isFetchingInitialData, selectedInvoice} = this.state;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    if (hasObjectLength(selectedInvoice)) {
      const amount = values?.amount ?? 0;
      const due = selectedInvoice?.due_amount ?? 0;
      const total = selectedInvoice?.total ?? 0;

      if (due !== 0 && amount > due) {
        showNotification({message: t('payments.alertAmount'), type: 'error'});
        return;
      }

      if (due === 0 && amount > total) {
        showNotification({message: t('payments.alertAmount'), type: 'error'});
        return;
      }
    }

    const onSuccess = res => {
      const onSelect = route?.params?.onSelect;
      onSelect?.(res);
      navigation.goBack();
    };

    const params = {
      id,
      onSuccess,
      navigation,
      hasRecordPayment,
      params: {
        ...values,
        customFields: getApiFormattedCustomFields(values?.customFields)
      }
    };

    this.props.isCreateScreen
      ? dispatch(addPayment(params))
      : dispatch(updatePayment(params));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_PAYMENT_FORM, field, value));
  };

  navigateToCustomer = () => {
    const {navigation} = this.props;
    dismissRoute(routes.CREATE_CUSTOMER, () => {
      navigation.navigate(routes.CREATE_CUSTOMER, {
        type: 'ADD',
        onSelect: customer => {
          this.customerReference?.changeDisplayValue?.(customer);
          this.onCustomerSelect(customer);
          this.fetchNextPaymentNumber(customer.id);
        }
      });
    });
  };

  onSelectInvoice = invoice => {
    this.setFormField(`invoice_id`, invoice?.id);
    this.setFormField(`amount`, invoice?.due_amount);
    this.setState({selectedInvoice: invoice, due_amount: invoice?.due_amount});
  };

  fetchNextPaymentNumber = userId => {
    const {id = null, dispatch} = this.props;
    const onSuccess = nextNumber =>
      this.setFormField('payment_number', nextNumber);
    dispatch(fetchNextPaymentNumber({userId, model_id: id, onSuccess}));
  };

  onCustomerSelect = customer => {
    customer && this.state.hasProvider && this.setState({hasProvider: false});
    this.setFormField(`exchange_rate`, null);
    this.setFormField(`customer_id`, customer.id);
    this.setState({selectedCustomer: customer, due_amount: null});
    this.invoiceReference?.changeDisplayValue?.(null);
    this.setFormField(`amount`, null);
    this.setFormField(`invoice_id`, null);
    this.fetchNextPaymentNumber(customer.id);
    this.setExchangeRate(customer.currency);
  };

  setExchangeRate = (customerCurrency, onResult) => {
    const {currency, dispatch} = this.props;
    const hasExchangeRate = customerCurrency?.id !== currency?.id;
    this.setState({hasExchangeRate, currency: customerCurrency});
    const onSuccess = ({exchangeRate}) => {
      this.setFormField('exchange_rate', exchangeRate?.[0]);
      onResult?.();
    };
    const onFail = () => onResult?.();
    hasExchangeRate &&
      dispatch(checkExchangeRate(customerCurrency.id, onSuccess, onFail));
  };

  checkExchangeRateProvider = customerCurrency => {
    const {currency, dispatch} = this.props;
    const hasExchangeRate = customerCurrency?.id !== currency?.id;
    this.setState({hasExchangeRate, currency: customerCurrency});
    const onSuccess = ({success}) =>
      success && this.setState({hasProvider: true});
    const onFail = () => this.setState({hasProvider: false});
    hasExchangeRate &&
      dispatch(
        checkExchangeRateProvider(customerCurrency.id, onSuccess, onFail)
      );
    this.setExchangeRate(customerCurrency);
  };

  render() {
    const {
      isSaving,
      isDeleting,
      navigation,
      handleSubmit,
      customers,
      fetchCustomers,
      fetchPaymentModes,
      paymentModes,
      formValues,
      fetchPaymentInvoices,
      paymentInvoices,
      customFields,
      isEditScreen,
      isAllowToEdit,
      currency,
      notes,
      fetchNotes
    } = this.props;

    const {
      isFetchingInitialData,
      selectedCustomer,
      hasExchangeRate,
      due_amount
    } = this.state;
    const description = due_amount
      ? t('payments.invoice_description', {due_amount: due_amount / 100})
      : '';
    const disabled = !isAllowToEdit;

    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: handleSubmit(this.onSave)
    });

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          loading={isSaving}
          disabled={isFetchingInitialData || isDeleting}
          onPress={handleSubmit(this.onSave)}
          show={isAllowToEdit}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={headerProps}
        loadingProps={{is: isFetchingInitialData}}
        bottomAction={bottomAction}
        dropdownProps={options(this)}
      >
        {isEditScreen && (
          <SendMail
            reference={ref => (this.sendMailRef = ref)}
            toEmail={this.props.formValues?.customer?.email}
            id={this.props.id}
            type="payment"
          />
        )}

        <Field
          name="payment_date"
          component={BaseDatePicker}
          dateTimeFormat={DATE_FORMAT}
          label={t('payments.date')}
          icon={'calendar-alt'}
          onChangeCallback={val => this.setFormField('payment_date', val)}
          isRequired
          disabled={disabled}
        />

        <Field
          name="payment_number"
          component={BaseInput}
          hint={t('payments.number')}
          isRequired
          disabled={!isAllowToEdit}
        />

        <Field
          name="customer_id"
          customers={customers}
          fetchCustomers={fetchCustomers}
          component={CustomerSelectModal}
          disabled={disabled}
          selectedItem={selectedCustomer}
          onSelect={this.onCustomerSelect}
          rightIconPress={this.navigateToCustomer}
          reference={ref => (this.customerReference = ref)}
        />

        {hasExchangeRate && <ExchangeRateField {...this} />}

        <Field
          name="invoice_id"
          invoices={paymentInvoices}
          getInvoices={fetchPaymentInvoices}
          component={InvoiceSelectModal}
          selectedItem={formValues?.invoice}
          disabled={disabled}
          onSelect={item => this.onSelectInvoice(item)}
          reference={ref => (this.invoiceReference = ref)}
          queryString={{
            customer_id: formValues?.customer_id,
            status: isEditScreen ? '' : 'DUE'
          }}
          description={description}
        />

        <Field
          name="amount"
          component={BaseInput}
          leftSymbol={selectedCustomer?.currency?.symbol ?? currency?.symbol}
          hint={t('payments.amount')}
          keyboardType={keyboardType.DECIMAL}
          disabled={disabled}
          isCurrencyInput
          isRequired
        />

        <Field
          name="payment_method_id"
          paymentModes={paymentModes}
          fetchPaymentModes={fetchPaymentModes}
          component={PaymentModeSelectModal}
          disabled={disabled}
          selectedItem={formValues?.payment_method}
          onSelect={item => this.setFormField(`payment_method_id`, item.id)}
        />

        <Notes
          {...this.props}
          navigation={navigation}
          notes={notes}
          fetchNotes={fetchNotes}
          isEditScreen={isEditScreen}
          noteType={'Payment'}
          onSelect={this.setFormField}
        />

        <CustomField {...this.props} />
      </DefaultLayout>
    );
  }
}
