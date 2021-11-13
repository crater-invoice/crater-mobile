import React, {Component} from 'react';
import {Field, change, initialize} from 'redux-form';
import moment from 'moment';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-payment-type';
import {DATE_FORMAT, hasObjectLength, isEmpty} from '@/constants';
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
  Notes
} from '@/components';
import {
  addPayment,
  updatePayment,
  fetchSinglePayment,
  fetchPaymentInitialDetails,
  sendPaymentReceipt
} from 'stores/payment/actions';

export default class CreatePayment extends Component<IProps, IStates> {
  invoiceReference: any;
  sendMailRef: any;
  customerReference: any;
  constructor(props) {
    super(props);
    this.state = {
      isFetchingInitialData: true,
      selectedInvoice: null,
      selectedCustomer: null
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

    let data = {
      payment_date: moment(),
      ...res
    };

    await this.setState({
      selectedCustomer: data?.customer,
      selectedInvoice: data?.invoice
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
      await this.setState({
        selectedCustomer: invoice?.customer,
        selectedInvoice: invoice?.due
      });
    }

    const customer = route?.params?.customer;
    if (customer) {
      data = {...data, customer_id: customer.id};
      await this.setState({selectedCustomer: customer});
    }

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
      const subTotal = selectedInvoice?.sub_total ?? 0;

      if (due !== 0 && amount > due) {
        showNotification({message: t('payments.alertAmount'), type: 'error'});
        return;
      }

      if (due === 0 && amount > subTotal) {
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

  sendPaymentReceipt = params => {
    const {dispatch, id} = this.props;
    dispatch(sendPaymentReceipt(id, params));
  };

  navigateToCustomer = () => {
    const {navigation} = this.props;
    dismissRoute(routes.CREATE_CUSTOMER, () => {
      navigation.navigate(routes.CREATE_CUSTOMER, {
        type: 'ADD',
        onSelect: customer => {
          this.customerReference?.changeDisplayValue?.(customer);
          this.onSelectCustomer(customer);
        }
      });
    });
  };

  onSelectCustomer = customer => {
    const {formValues} = this.props;
    if (customer?.id === formValues?.customer_id) {
      return;
    }
    this.setFormField(`customer_id`, customer.id);
    this.setState({selectedCustomer: customer});
    this.invoiceReference?.changeDisplayValue?.(null);
    this.setFormField(`amount`, null);
    this.setFormField(`invoice_id`, null);
  };

  onSelectInvoice = invoice => {
    this.setFormField(`invoice_id`, invoice?.id);
    this.setFormField(`amount`, invoice?.due_amount);
    this.setState({selectedInvoice: invoice});
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
      fetchUnpaidInvoices,
      unPaidInvoices,
      customFields,
      isEditScreen,
      isAllowToEdit,
      currency,
      notes,
      fetchNotes
    } = this.props;

    const {isFetchingInitialData, selectedCustomer} = this.state;

    const disabled = !isAllowToEdit;

    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: handleSubmit(this.onSave)
    });

    const hasCustomField = isEditScreen
      ? formValues && formValues.hasOwnProperty('fields')
      : !isEmpty(customFields);

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
            headerTitle="header.send_mail_payment"
            alertDesc="payments.alert.send_payment"
            user={this.props.formValues?.user}
            body="payment_mail_body"
            onSendMail={params => this.sendPaymentReceipt(params)}
          />
        )}

        <CtView flex={1} flex-row>
          <CtView flex={1} justify-between>
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
          </CtView>
          <CtView flex={0.07} />
          <CtView flex={1} justify-between>
            <Field
              name="payment_number"
              component={BaseInput}
              hint={t('payments.number')}
              isRequired
              disabled={!isAllowToEdit}
            />
          </CtView>
        </CtView>

        <Field
          name="customer_id"
          customers={customers}
          fetchCustomers={fetchCustomers}
          component={CustomerSelectModal}
          disabled={disabled || isEditScreen}
          selectedItem={selectedCustomer}
          onSelect={item => this.onSelectCustomer(item)}
          rightIconPress={this.navigateToCustomer}
          reference={ref => (this.customerReference = ref)}
        />

        <Field
          name="invoice_id"
          invoices={unPaidInvoices}
          getInvoices={fetchUnpaidInvoices}
          component={InvoiceSelectModal}
          selectedItem={formValues?.invoice}
          disabled={disabled || isEditScreen}
          onSelect={item => this.onSelectInvoice(item)}
          reference={ref => (this.invoiceReference = ref)}
          queryString={{
            customer_id: formValues?.customer_id,
            status: 'UNPAID'
          }}
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

        {hasCustomField && <CustomField {...this.props} type={null} />}
      </DefaultLayout>
    );
  }
}
