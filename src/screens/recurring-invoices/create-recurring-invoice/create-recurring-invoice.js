import React, {Component} from 'react';
import moment from 'moment';
import {Field, change, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-recurring-invoice-type.d';
import {routes} from '@/navigation';
import {alertMe, isEmpty} from '@/constants';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoice/types';
import {
  DefaultLayout,
  BaseDatePicker,
  CustomField,
  Notes,
  ItemField,
  BaseSwitch,
  FinalAmount,
  BaseInput,
  BaseButtonGroup,
  BaseButton,
  BaseDropdownPicker,
  ExchangeRateField,
  TemplateField
} from '@/components';
import {
  fetchRecurringInvoiceInitialDetails,
  fetchSingleRecurringInvoice,
  addRecurringInvoice,
  updateRecurringInvoice,
  removeRecurringInvoice,
  fetchNextInvoiceAt
} from 'stores/recurring-invoice/actions';
import {CustomerSelectModal} from '@/select-modal';
import styles from './create-recurring-invoice-styles';
import {FrequencyField, LimitField} from '../recurring-invoices-common';
import {
  total,
  tax,
  CompoundTax,
  getCompoundTaxValue,
  totalDiscount,
  getTaxValue,
  getItemList,
  finalAmount
} from '@/components/final-amount/final-amount-calculation';
import {setCalculationRef} from 'stores/common/helpers';
import {
  getApiFormattedCustomFields,
  secondaryHeader,
  showNotification
} from '@/utils';
import {initialValues} from 'stores/recurring-invoice/helpers';
import {
  checkExchangeRate,
  checkExchangeRateProvider
} from 'stores/common/actions';
import {fetchSalesTaxRate} from 'stores/taxation/actions';
import {setSalesTaxUsFieldValue, taxationTypes} from 'stores/taxation/helper';

export default class CreateRecurringInvoice extends Component<IProps, IStates> {
  recurringInvoiceRefs: any;
  sendMailRef: any;
  customerReference: any;

  constructor(props) {
    super(props);
    this.recurringInvoiceRefs = setCalculationRef.bind(this);
    this.sendMailRef = React.createRef();
    this.customerReference = React.createRef();
    this.state = {
      currency: props?.currency,
      isFetchingInitialData: true,
      hasExchangeRate: false,
      hasProvider: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  exchangeRate = () => this.props?.formValues?.exchange_rate;

  loadData = () => {
    const {isCreateScreen, id, dispatch} = this.props;
    if (isCreateScreen) {
      dispatch(
        fetchRecurringInvoiceInitialDetails(() => this.setInitialData(null))
      );
      return;
    }

    dispatch(
      fetchSingleRecurringInvoice(id, invoice => this.setInitialData(invoice))
    );
  };

  setInitialData = async invoice => {
    const {dispatch, invoiceTemplates = {}, route, isCreateScreen} = this.props;
    let values = {
      ...initialValues(invoiceTemplates),
      ...setSalesTaxUsFieldValue(invoice)
    };
    let customerCurrency = invoice?.customer?.currency;
    if (invoice) {
      values = {...values, ...invoice};
    }
    const customer = route?.params?.customer;
    if (customer) {
      values = {
        ...values,
        customer,
        customer_id: customer.id
      };
      customerCurrency = customer.currency;
    }
    customerCurrency &&
      (await this.checkExchangeRateProvider(customerCurrency));
    dispatch(initialize(CREATE_RECURRING_INVOICE_FORM, values));
    this.fetchNextInvoice();
    await this.setState({isFetchingInitialData: false});
    isCreateScreen && this.fetchSalesTaxRate();
  };

  onSave = values => {
    const {
      navigation,
      id,
      isCreateScreen,
      dispatch,
      isSaving,
      isDeleting
    } = this.props;

    if (isSaving || isDeleting || this.state.isFetchingInitialData) {
      return;
    }

    if (finalAmount() <= 0) {
      showNotification({
        message: t('invoices.alert.less_amount'),
        type: 'error'
      });
      return;
    }

    let invoice = {
      ...values,
      total: finalAmount(),
      sub_total: total(),
      tax: tax() + CompoundTax(),
      discount_val: totalDiscount(),
      currency_id: this.state.currency.id,
      taxes: values.taxes
        ? values.taxes.map(val => {
            return {
              ...val,
              amount: val.compound_tax
                ? getCompoundTaxValue(val.percent)
                : getTaxValue(val.percent)
            };
          })
        : []
    };

    const params = {
      invoice: {
        ...invoice,
        id,
        customFields: getApiFormattedCustomFields(values?.customFields)
      },
      navigation,
      onSuccess: () => {
        navigation.navigate(routes.RECURRING_INVOICES);
      }
    };

    isCreateScreen
      ? dispatch(addRecurringInvoice(params))
      : dispatch(updateRecurringInvoice(params));
  };

  removeRecurringInvoice = () => {
    const {id, dispatch} = this.props;

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('users.alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() => dispatch(removeRecurringInvoice(id)));
  };

  setFormField = (field, value) => {
    const {dispatch} = this.props;
    dispatch(change(CREATE_RECURRING_INVOICE_FORM, field, value));
  };

  navigateToRole = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_ROLE, {
      type: 'ADD',
      onSelect: item => this.setFormField(`role`, item.name)
    });
  };

  getInvoiceItemList = selectedItems => {
    this.setFormField('items', selectedItems);

    const {currency} = this.state;

    if (isEmpty(selectedItems)) {
      return [];
    }

    return selectedItems.map(item => {
      let {name, description, price, quantity, total} = item;

      return {
        title: name,
        subtitle: {
          title: description,
          labelComponent: (
            <CurrencyFormat
              amount={price}
              currency={currency}
              preText={`${quantity} * `}
              style={styles.itemLeftSubTitle(this.props.theme)}
              containerStyle={styles.itemLeftSubTitleLabel}
            />
          )
        },
        amount: total,
        currency,
        fullItem: item
      };
    });
  };

  fetchNextInvoice = () => {
    const {
      formValues: {starts_at, frequency},
      dispatch,
      dateFormat
    } = this.props;
    const params = {
      starts_at,
      frequency
    };
    dispatch(
      fetchNextInvoiceAt({
        params,
        onSuccess: data => {
          if (data?.success) {
            let nextInvDate = moment(data?.next_invoice_at).format(dateFormat);
            this.setFormField('next_invoice_at', nextInvDate);
          }
        }
      })
    );
  };

  onCreateNewCustomer = data => {
    const {billing = {}, shipping = {}} = data;
    this.customerReference?.changeDisplayValue?.(data);
    this.onCustomerSelect(data);
    this.fetchSalesTaxRate(taxationTypes.CUSTOMER_LEVEL, shipping, billing);
  };

  navigateToCustomer = () => {
    const {navigation} = this.props;
    const {currency} = this.state;

    navigation.navigate(routes.CREATE_CUSTOMER, {
      type: 'ADD',
      currency,
      onSelect: this.onCreateNewCustomer
    });
  };

  onCustomerSelect = data => {
    const {id, currency, billing = {}, shipping = {}} = data;
    data && this.state.hasProvider && this.setState({hasProvider: false});
    this.setFormField('exchange_rate', null);
    this.setFormField('customer_id', id);
    this.setExchangeRate(currency);
    this.fetchSalesTaxRate(taxationTypes.CUSTOMER_LEVEL, shipping, billing);
  };

  fetchSalesTaxRate = (
    type = taxationTypes.COMPANY_LEVEL,
    shipping = null,
    billing = null
  ) => {
    const {dispatch} = this.props;
    const params = {
      form: CREATE_RECURRING_INVOICE_FORM,
      type,
      shipping,
      billing
    };
    dispatch(fetchSalesTaxRate(params));
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
  };

  render() {
    const {
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      formValues,
      customers,
      fetchCustomers,
      selectedItems,
      items,
      customFields,
      navigation,
      statusList,
      notes,
      fetchNotes,
      isSaving,
      isDeleting,
      invoiceTemplates = [],
      formValues: {
        limit_by,
        limit_date,
        limit_count,
        frequency,
        frequency_picker,
        status
      }
    } = this.props;
    const hasCustomField = isEditScreen
      ? formValues && formValues.hasOwnProperty('fields')
      : !isEmpty(customFields);
    const {isFetchingInitialData, hasExchangeRate} = this.state;

    const disabled = !isAllowToEdit;
    this.recurringInvoiceRefs(this);

    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: this.props.handleSubmit(this.onSave)
    });

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          show={isAllowToEdit}
          loading={isSaving}
          disabled={isFetchingInitialData || isDeleting}
          onPress={this.props.handleSubmit(this.onSave)}
        >
          {t('button.save')}
        </BaseButton>
        <BaseButton
          type="danger"
          show={isEditScreen && isAllowToDelete}
          loading={isDeleting}
          disabled={isFetchingInitialData || isSaving}
          onPress={this.removeRecurringInvoice}
        >
          {t('button.remove')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="customer_id"
          fetchCustomers={fetchCustomers}
          customers={customers}
          component={CustomerSelectModal}
          selectedItem={formValues?.customer}
          onSelect={this.onCustomerSelect}
          rightIconPress={this.navigateToCustomer}
          reference={ref => (this.customerReference = ref)}
          disabled={disabled}
        />

        {hasExchangeRate && <ExchangeRateField {...this} />}

        <Field
          name={'starts_at'}
          isRequired
          component={BaseDatePicker}
          label={t('recurring_invoices.start_date')}
          icon={'calendar-alt'}
          onChangeCallback={val => {
            this.setFormField('starts_at', val);
            this.fetchNextInvoice();
          }}
          disabled={disabled}
        />
        <Field
          name="next_invoice_at"
          component={BaseInput}
          inputProps={{}}
          meta={{}}
          hint={t('recurring_invoices.next_invoice_at')}
          leftIcon={'calendar-alt'}
          disabled
        />

        <LimitField
          limitByField={{
            name: 'limit_by',
            value: limit_by,
            onChangeCallback: value => this.setFormField('limit_by', value)
          }}
          limitDateField={{
            name: 'limit_date',
            value: limit_date
          }}
          limitCountField={{
            name: 'limit_count',
            value: limit_count
          }}
        />

        <Field
          name="status"
          component={BaseDropdownPicker}
          label={t('recurring_invoices.status.title')}
          items={statusList}
          isRequired
          fieldIcon={'tag'}
          onChangeCallback={item => this.setFormField('status', item)}
          defaultPickerOptions={{
            label: t('recurring_invoices.status.placeholder'),
            value: ''
          }}
          disabled={disabled}
        />

        <FrequencyField
          frequencyPickerField={{
            name: 'frequency_picker',
            value: frequency_picker
          }}
          frequencyField={{
            name: 'frequency',
            value: frequency
          }}
          onChangeCallback={val => {
            if (!val) {
              return;
            }
            this.setFormField('frequency', val);
            this.fetchNextInvoice();
          }}
          callbackWhenMount={() => {
            this.setFormField('frequency_picker', frequency);
          }}
        />

        <ItemField
          {...this.props}
          currency={this.state.currency}
          selectedItems={selectedItems}
          items={getItemList(items)}
          screen="recurring_invoice"
          setFormField={this.setFormField}
        />

        <FinalAmount {...this.props} currency={this.state.currency} />

        <Notes
          {...this.props}
          navigation={navigation}
          notes={notes}
          fetchNotes={fetchNotes}
          isEditScreen={isEditScreen}
          noteType={'Invoice'}
          onSelect={this.setFormField}
        />

        <Field
          name="template_name"
          templates={invoiceTemplates ?? []}
          component={TemplateField}
          label={t('invoices.template')}
          icon={'file-alt'}
          placeholder={t('invoices.template_placeholder')}
          navigation={navigation}
          disabled={disabled}
          isRequired
        />

        <Field
          name={'send_automatically'}
          component={BaseSwitch}
          hint={t('recurring_invoices.auto_sent.label')}
          description={t('recurring_invoices.auto_sent.description')}
        />

        <CustomField {...this.props} />
      </DefaultLayout>
    );
  }
}
