import React from 'react';
import _ from 'lodash';
import * as Linking from 'expo-linking';
import {Field, change, initialize} from 'redux-form';
import t from 'locales/use-translation';
import styles from './create-expense-styles';
import {dismissRoute, routes} from '@/navigation';
import {alertMe, MAX_LENGTH} from '@/constants';
import {keyboardType} from '@/helpers/keyboard';
import {CREATE_EXPENSE_FORM} from 'stores/expense/types';
import {EXPENSE_ACTIONS, ACTIONS_VALUE} from 'stores/expense/helpers';
import {getApiFormattedCustomFields} from '@/utils';
import {
  CurrencySelectModal,
  CustomerSelectModal,
  ExpenseCategorySelectModal,
  PaymentModeSelectModal
} from '@/select-modal';
import {IProps, IStates} from './create-expense-type.d';
import {
  addExpense,
  fetchExpenseInitialDetails,
  fetchSingleExpense,
  removeExpense,
  updateExpense
} from 'stores/expense/actions';
import {
  BaseInput,
  DefaultLayout,
  FilePicker,
  BaseDatePicker,
  CustomField,
  BaseButtonGroup,
  ExchangeRateField,
  BaseButton
} from '@/components';
import {
  checkExchangeRate,
  checkExchangeRateProvider
} from 'stores/common/actions';

export default class CreateExpense extends React.Component<IProps, IStates> {
  customerReference: any;
  categoryReference: any;

  constructor(props) {
    super(props);
    this.customerReference = React.createRef();
    this.categoryReference = React.createRef();

    this.state = {
      isFetchingInitialData: true,
      attachmentReceipt: null,
      imageUrl: null,
      fileLoading: false,
      customer: null,
      currency: null,
      fileType: null,
      hasExchangeRate: false,
      hasProvider: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isEditScreen, id, dispatch} = this.props;

    if (isEditScreen) {
      dispatch(fetchSingleExpense(id, this.setInitialData));
      return;
    }

    dispatch(fetchExpenseInitialDetails(() => this.setInitialData(null)));
  };

  setInitialData = async res => {
    const {dispatch, route} = this.props;
    let selectedCurrency = res?.currency;
    const customer = route?.params?.customer;

    if (res) {
      const data = {
        ...res,
        payment_method_id: res?.payment_method?.id,
        currency_id: res?.currency?.id
      };
      dispatch(initialize(CREATE_EXPENSE_FORM, data));
      if (res?.attachment_receipt_url) {
        await this.setState({
          imageUrl: res?.attachment_receipt_url?.url,
          fileType: res?.attachment_receipt_url?.type
        });
      }
      await this.setState({customer: res?.customer});
    }

    if (customer) {
      this.setFormField('customer_id', customer.id);
      await this.setState({customer});
    }
    selectedCurrency &&
      (await this.checkExchangeRateProvider(selectedCurrency));
    this.setState({isFetchingInitialData: false});
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_EXPENSE_FORM, field, value));
  };

  onSave = values => {
    const {isCreateScreen, id, isSaving, isDeleting, dispatch} = this.props;
    const {attachmentReceipt, isFetchingInitialData} = this.state;

    if (isSaving || isDeleting || isFetchingInitialData) {
      return;
    }

    const payload = {
      id,
      params: {
        ...values,
        customFields: getApiFormattedCustomFields(values?.customFields)
      },
      attachmentReceipt
    };
    isCreateScreen
      ? dispatch(addExpense(payload))
      : dispatch(updateExpense(payload));
  };

  removeExpense = () => {
    const {id, navigation, dispatch} = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('expenses.alert_description'),
      showCancel: true,
      okPress: () => dispatch(removeExpense(id, navigation))
    });
  };

  onOptionSelect = action => {
    switch (action) {
      case ACTIONS_VALUE.REMOVE:
        return this.removeExpense();

      case ACTIONS_VALUE.DOWNLOAD:
        return Linking.openURL(this.state.imageUrl);

      default:
        break;
    }
  };

  navigateToCustomer = () => {
    const {navigation} = this.props;

    dismissRoute(routes.CREATE_CUSTOMER, () =>
      navigation.navigate(routes.CREATE_CUSTOMER, {
        type: 'ADD',
        onSelect: customer => {
          this.customerReference?.changeDisplayValue?.(customer);
          this.onCustomerSelect(customer);
        }
      })
    );
  };

  navigateToCategory = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_CATEGORY, {
      type: 'ADD',
      onSelect: item => {
        this.setFormField('expense_category_id', item.id);
        this.categoryReference?.changeDisplayValue?.(item);
      }
    });
  };

  onCurrencySelect = item => {
    item && this.state.hasProvider && this.setState({hasProvider: false});
    this.setFormField('exchange_rate', null);
    this.setFormField('currency_id', item.id);
    this.setExchangeRate(item);
  };

  onCustomerSelect = item => {
    this.setFormField('customer_id', item.id);
    this.setState({customer: item});
  };

  setExchangeRate = (selectedCurrency, onResult) => {
    const {currency, dispatch} = this.props;
    const hasExchangeRate = selectedCurrency?.id !== currency?.id;
    this.setState({hasExchangeRate, currency: selectedCurrency});
    const onSuccess = ({exchangeRate}) => {
      this.setFormField('exchange_rate', exchangeRate?.[0]);
      onResult?.();
    };
    const onFail = () => onResult?.();
    hasExchangeRate &&
      dispatch(checkExchangeRate(selectedCurrency.id, onSuccess, onFail));
  };

  checkExchangeRateProvider = selectedCurrency => {
    const {currency, dispatch} = this.props;
    const hasExchangeRate = selectedCurrency?.id !== currency?.id;
    this.setState({hasExchangeRate, currency: selectedCurrency});
    const onSuccess = ({success}) =>
      success && this.setState({hasProvider: true});
    const onFail = () => this.setState({hasProvider: false});
    hasExchangeRate &&
      dispatch(
        checkExchangeRateProvider(selectedCurrency.id, onSuccess, onFail)
      );
  };

  render() {
    const {
      navigation,
      handleSubmit,
      categories,
      fetchCategories,
      fetchCustomers,
      customers,
      customFields,
      formValues,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isCreateScreen,
      isSaving,
      isDeleting,
      currencies,
      paymentModes,
      fetchPaymentModes,
      theme
    } = this.props;
    const {
      imageUrl,
      fileType,
      customer,
      isFetchingInitialData,
      hasExchangeRate
    } = this.state;

    const categoryName = formValues?.expense_category?.name;
    const disabled = !isAllowToEdit;
    const isCreateExpense = isCreateScreen;

    const dropdownOptions =
      !isCreateExpense && !isFetchingInitialData
        ? EXPENSE_ACTIONS(imageUrl, isAllowToDelete)
        : [];

    const drownDownProps =
      !isCreateExpense && !isFetchingInitialData
        ? {
            options: dropdownOptions,
            onSelect: this.onOptionSelect,
            cancelButtonIndex: dropdownOptions.length,
            destructiveButtonIndex: dropdownOptions.length - 1,
            ...(!isAllowToDelete && {
              destructiveButtonIndex: dropdownOptions.length + 1
            })
          }
        : null;

    const getTitle = () => {
      let title = 'header.add_expense';
      if (isEditScreen && !isAllowToEdit) title = 'header.view_expense';
      if (isEditScreen && isAllowToEdit) title = 'header.edit_expense';

      return t(title);
    };

    const headerProps = {
      leftIconPress: () => navigation.goBack(null),
      title: getTitle(),
      placement: 'center',
      ...(!isEditScreen && {
        rightIcon: 'save',
        rightIconProps: {solid: true},
        rightIconPress: handleSubmit(this.onSave)
      })
    };

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
        dropdownProps={drownDownProps}
        bottomAction={bottomAction}
      >
        <Field
          name="attachment_receipt"
          component={FilePicker}
          withDocument
          label={t('expenses.receipt')}
          fileLoading={val => this.setState({fileLoading: val})}
          containerStyle={styles.filePicker}
          uploadedFileType={fileType}
          onChangeCallback={val => this.setState({attachmentReceipt: val})}
          uploadedFileUrl={
            fileType && fileType.includes('image') ? imageUrl : null
          }
          showUploadedImageAsCache={false}
          disabled={disabled}
        />

        <Field
          name="expense_date"
          component={BaseDatePicker}
          isRequired
          label={t('expenses.date')}
          icon={'calendar-alt'}
          disabled={disabled}
        />

        <Field
          name="amount"
          component={BaseInput}
          isRequired
          leftSymbol={
            _.find(currencies, {fullItem: {id: formValues?.currency_id}})
              ?.rightTitle
          }
          hint={t('expenses.amount')}
          disabled={disabled}
          keyboardType={keyboardType.DECIMAL}
          isCurrencyInput
        />

        <Field
          name="expense_category_id"
          categories={categories}
          fetchCategories={fetchCategories}
          component={ExpenseCategorySelectModal}
          placeholder={
            categoryName ? categoryName : t('expenses.category_placeholder')
          }
          onSelect={item => this.setFormField('expense_category_id', item.id)}
          rightIconPress={this.navigateToCategory}
          reference={ref => (this.categoryReference = ref)}
          disabled={disabled}
        />

        <Field
          name="currency_id"
          component={CurrencySelectModal}
          currencies={currencies}
          label={t('settings.preferences.currency')}
          onSelect={this.onCurrencySelect}
          isRequired
          theme={theme}
        />

        {hasExchangeRate && <ExchangeRateField {...this} />}

        <Field
          name="customer_id"
          component={CustomerSelectModal}
          fetchCustomers={fetchCustomers}
          placeholder={t('invoices.customer_placeholder')}
          selectedItem={customer}
          customers={customers}
          disabled={disabled}
          onSelect={this.onCustomerSelect}
          rightIconPress={this.navigateToCustomer}
          reference={ref => (this.customerReference = ref)}
          isRequired={false}
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

        <Field
          name="notes"
          component={BaseInput}
          hint={t('expenses.notes')}
          placeholder={t('expenses.notes_placeholder')}
          inputProps={{
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          disabled={disabled}
          height={80}
        />

        <CustomField {...this.props} />
      </DefaultLayout>
    );
  }
}
