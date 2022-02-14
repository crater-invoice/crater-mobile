import React from 'react';
import * as Linking from 'expo-linking';
import {find} from 'lodash';
import {Field, change, initialize} from 'redux-form';
import {
  BaseInput,
  BaseDatePicker,
  DefaultLayout,
  SendMail,
  CustomField,
  View as CtView,
  Notes,
  ItemField,
  FinalAmount,
  BaseButtonGroup,
  BaseButton,
  ExchangeRateField,
  TemplateField
} from '@/components';
import {
  CREATE_ESTIMATE_FORM,
  ESTIMATE_ACTIONS,
  MARK_AS_ACCEPT,
  MARK_AS_REJECT,
  MARK_AS_SENT
} from 'stores/estimate/types';
import {EDIT_ESTIMATE_ACTIONS} from 'stores/estimate/helpers';
import {headerTitle} from '@/styles';

import {dismissRoute, routes} from '@/navigation';
import t from 'locales/use-translation';
import {
  total,
  tax,
  getTaxValue,
  totalDiscount,
  getCompoundTaxValue,
  finalAmount,
  getItemList,
  CompoundTax
} from '@/components/final-amount/final-amount-calculation';
import {alertMe} from '@/constants';
import {getApiFormattedCustomFields} from '@/utils';
import {CustomerSelectModal} from '@/select-modal';
import {setCalculationRef} from 'stores/common/helpers';
import {showNotification} from '@/utils';
import {IProps, IStates} from './create-estimate-type.d';
import {initialValues} from 'stores/estimate/helpers';
import {
  fetchEstimateInitialDetails,
  fetchSingleEstimate,
  convertToInvoice,
  changeEstimateStatus,
  removeEstimate,
  addEstimate,
  updateEstimate,
  fetchNextEstimateNumber
} from 'stores/estimate/actions';
import {
  checkExchangeRate,
  checkExchangeRateProvider
} from 'stores/common/actions';
import {fetchSalesTaxRate} from 'stores/taxation/actions';
import {setSalesTaxUsFieldValue, taxationTypes} from 'stores/taxation/helper';

export default class CreateEstimate extends React.Component<IProps, IStates> {
  estimateRefs: any;
  sendMailRef: any;
  customerReference: any;

  constructor(props) {
    super(props);
    this.estimateRefs = setCalculationRef.bind(this);
    this.sendMailRef = React.createRef();
    this.customerReference = React.createRef();
    this.notesReference = React.createRef();

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

  loadData = () => {
    const {isEditScreen, id, dispatch} = this.props;

    if (isEditScreen) {
      dispatch(fetchSingleEstimate(id, this.setInitialData));
      return;
    }
    dispatch(
      fetchEstimateInitialDetails(estimate_number =>
        this.setInitialData({estimate_number})
      )
    );
    return;
  };

  exchangeRate = () => this.props?.formValues?.exchange_rate;

  setInitialData = async res => {
    const {dispatch, estimateTemplates, route, isCreateScreen} = this.props;

    let values = {
      ...initialValues(estimateTemplates),
      ...setSalesTaxUsFieldValue(res),
      ...res
    };
    let customerCurrency = res?.customer?.currency;
    const customer = route?.params?.customer;
    if (customer) {
      values = {
        ...values,
        customer,
        customer_id: customer.id
      };
      customerCurrency = customer.currency;
      this.fetchNextEstimateNumber(customer.id);
    }
    customerCurrency &&
      (await this.checkExchangeRateProvider(customerCurrency));
    dispatch(initialize(CREATE_ESTIMATE_FORM, values));
    await this.setState({isFetchingInitialData: false});
    isCreateScreen && this.fetchSalesTaxRate();
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_ESTIMATE_FORM, field, value));
  };

  onDraft = handleSubmit => {
    const {navigation, isEditScreen} = this.props;
    const {isFetchingInitialData} = this.state;

    if (isFetchingInitialData) {
      navigation.goBack();
      return;
    }

    if (isEditScreen) {
      navigation.goBack();
      return;
    }

    alertMe({
      title: t('estimates.alert.draft_title'),
      showCancel: true,
      cancelText: t('alert.action.discard'),
      cancelPress: () => navigation.goBack(),
      okText: t('alert.action.save_as_draft'),
      okPress: handleSubmit(this.draftEstimate)
    });
  };

  onSubmitEstimate = (values, status = 'draft') => {
    const {
      isCreateScreen,
      navigation,
      isFetchingInitialData,
      isSaving,
      isDeleting,
      id,
      dispatch,
      estimateTemplates
    } = this.props;

    if (
      this.state.isFetchingInitialData ||
      isFetchingInitialData ||
      isSaving ||
      isDeleting
    ) {
      return;
    }

    if (finalAmount() <= 0) {
      showNotification({
        message: t('estimates.alert.less_amount'),
        type: 'error'
      });
      return;
    }

    let estimate = {
      ...values,
      estimate_no: values.estimate_number,
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

    if (status === 'send') {
      estimate.estimateSend = true;
    }

    estimate.estimate_template_id = find(estimateTemplates, {
      name: estimate?.template_name
    })?.id;

    const params = {
      estimate: {
        ...estimate,
        id,
        customFields: getApiFormattedCustomFields(values?.customFields)
      },
      navigation,
      onSuccess: () => navigation.navigate(routes.ESTIMATES)
    };
    isCreateScreen
      ? dispatch(addEstimate(params))
      : dispatch(updateEstimate(params));
  };

  downloadEstimate = values => {
    const url = values?.estimate_pdf_url;
    Linking.openURL(url);
  };

  saveEstimate = values => {
    this.onSubmitEstimate(values, 'save');
  };

  draftEstimate = values => {
    this.onSubmitEstimate(values, 'draft');
  };

  removeEstimate = () => {
    const {navigation, id, dispatch} = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('estimates.alert.remove_description'),
      showCancel: true,
      okPress: () => dispatch(removeEstimate(id, navigation))
    });
  };

  onOptionSelect = action => {
    const {navigation, id, dispatch} = this.props;

    switch (action) {
      case ESTIMATE_ACTIONS.SEND:
        this.sendMailRef?.openModal?.();
        break;

      case ESTIMATE_ACTIONS.MARK_AS_SENT:
        alertMe({
          title: t('alert.title'),
          desc: t('estimates.alert.mark_as_sent'),
          showCancel: true,
          okPress: () =>
            dispatch(
              changeEstimateStatus({
                id,
                action: `${id}/status`,
                navigation,
                params: {status: MARK_AS_SENT},
                onSuccess: () =>
                  showNotification({
                    message: t('notification.estimate_mark_as_sent')
                  })
              })
            )
        });
        break;

      case ESTIMATE_ACTIONS.MARK_AS_ACCEPTED:
        alertMe({
          title: t('alert.title'),
          desc: t('estimates.alert.mark_as_accept'),
          showCancel: true,
          okPress: () =>
            dispatch(
              changeEstimateStatus({
                id,
                action: `${id}/status`,
                navigation,
                params: {status: MARK_AS_ACCEPT},
                onSuccess: () =>
                  showNotification({
                    message: t('notification.estimate_marked_as_accepted')
                  })
              })
            )
        });
        break;

      case ESTIMATE_ACTIONS.MARK_AS_REJECTED:
        alertMe({
          title: t('alert.title'),
          desc: t('estimates.alert.mark_as_reject'),
          showCancel: true,
          okPress: () =>
            dispatch(
              changeEstimateStatus({
                id,
                action: `${id}/status`,
                navigation,
                params: {status: MARK_AS_REJECT},
                onSuccess: () =>
                  showNotification({
                    message: t('notification.estimate_marked_as_rejected')
                  })
              })
            )
        });
        break;

      case ESTIMATE_ACTIONS.CONVERT_TO_INVOICE:
        alertMe({
          desc: t('estimates.alert.convert_to_invoice_description'),
          showCancel: true,
          okPress: () =>
            dispatch(
              convertToInvoice(id, () =>
                navigation.navigate(routes.MAIN_INVOICES)
              )
            )
        });
        break;

      case ESTIMATE_ACTIONS.DELETE:
        this.removeEstimate();
        break;

      default:
        break;
    }
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

    dismissRoute(routes.CREATE_CUSTOMER, () => {
      navigation.navigate(routes.CREATE_CUSTOMER, {
        type: 'ADD',
        currency,
        onSelect: this.onCreateNewCustomer
      });
    });
  };

  onCustomerSelect = data => {
    const {id, currency, billing = {}, shipping = {}} = data;
    data && this.state.hasProvider && this.setState({hasProvider: false});
    this.setFormField('exchange_rate', null);
    this.setFormField('customer_id', id);
    this.setExchangeRate(currency);
    this.fetchNextEstimateNumber(id);
    this.fetchSalesTaxRate(taxationTypes.CUSTOMER_LEVEL, shipping, billing);
  };

  fetchSalesTaxRate = (
    type = taxationTypes.COMPANY_LEVEL,
    shipping = null,
    billing = null
  ) => {
    const {dispatch} = this.props;
    const params = {form: CREATE_ESTIMATE_FORM, type, shipping, billing};
    dispatch(fetchSalesTaxRate(params));
  };

  fetchNextEstimateNumber = userId => {
    const {id, dispatch} = this.props;
    const onSuccess = nextNumber =>
      this.setFormField('estimate_number', nextNumber);
    dispatch(fetchNextEstimateNumber({userId, model_id: id, onSuccess}));
  };

  setExchangeRate = (customerCurrency, onResult = null) => {
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
      navigation,
      handleSubmit,
      estimateTemplates,
      selectedItems,
      items,
      fetchCustomers,
      customers,
      formValues,
      formValues: {customer, status},
      customFields,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isSaving,
      isDeleting,
      isLoading,
      notes,
      fetchNotes
    } = this.props;
    const {isFetchingInitialData, hasExchangeRate} = this.state;
    const disabled = !isAllowToEdit;

    let hasCompleteStatus = status === 'COMPLETED';

    const dropdownOptions =
      isEditScreen && !isFetchingInitialData
        ? EDIT_ESTIMATE_ACTIONS(status, isAllowToEdit, isAllowToDelete)
        : [];

    let drownDownProps =
      isEditScreen && !isFetchingInitialData
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
      let title = 'header.add_estimate';
      if (isEditScreen && !isAllowToEdit) title = 'header.view_estimate';
      if (isEditScreen && isAllowToEdit) title = 'header.edit_estimate';

      return t(title);
    };

    this.estimateRefs(this);

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          show={isEditScreen && isAllowToEdit}
          type="primary-btn-outline"
          disabled={
            isFetchingInitialData || isSaving || isDeleting || isLoading
          }
          onPress={handleSubmit(this.downloadEstimate)}
        >
          {t('button.view_pdf')}
        </BaseButton>
        <BaseButton
          show={isAllowToEdit}
          loading={isSaving}
          disabled={isFetchingInitialData || isDeleting || isLoading}
          onPress={handleSubmit(this.saveEstimate)}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );
    const headerProps = {
      leftIconPress: () => this.onDraft(handleSubmit),
      title: getTitle(),
      placement: 'center',
      withTitleStyle: headerTitle({
        marginLeft: -15,
        marginRight: -15
      }),
      ...(!isEditScreen && {
        rightIcon: 'save',
        rightIconProps: {solid: true},
        rightIconPress: handleSubmit(this.saveEstimate)
      })
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
        dropdownProps={drownDownProps}
        bodyStyle="px-22 pt-10 pb-15"
      >
        {isEditScreen && !hasCompleteStatus && (
          <SendMail
            reference={ref => (this.sendMailRef = ref)}
            toEmail={this.props?.formValues?.customer?.email}
            id={this.props.id}
            type="estimate"
          />
        )}

        <CtView flex={1} flex-row>
          <CtView flex={1} justify-between>
            <Field
              name={'estimate_date'}
              isRequired
              component={BaseDatePicker}
              label={t('estimates.estimate_date')}
              icon={'calendar-alt'}
              onChangeCallback={val => this.setFormField('estimate_date', val)}
              disabled={disabled}
            />
          </CtView>
          <CtView flex={0.07} />
          <CtView flex={1} justify-between>
            <Field
              name="expiry_date"
              isRequired
              component={BaseDatePicker}
              label={t('estimates.expiry_date')}
              icon={'calendar-alt'}
              onChangeCallback={val => this.setFormField('expiry_date', val)}
              disabled={disabled}
            />
          </CtView>
        </CtView>

        <Field
          name="estimate_number"
          component={BaseInput}
          isRequired
          hint={t('estimates.estimate_number')}
          disabled={disabled}
        />

        <Field
          name="customer_id"
          fetchCustomers={fetchCustomers}
          customers={customers}
          component={CustomerSelectModal}
          selectedItem={customer}
          onSelect={this.onCustomerSelect}
          rightIconPress={this.navigateToCustomer}
          reference={ref => (this.customerReference = ref)}
          disabled={disabled}
        />

        {hasExchangeRate && <ExchangeRateField {...this} />}

        <ItemField
          {...this.props}
          currency={this.state.currency}
          selectedItems={selectedItems}
          items={getItemList(items)}
          screen="estimate"
          setFormField={this.setFormField}
        />

        <FinalAmount {...this.props} currency={this.state.currency} />

        <Notes
          {...this.props}
          navigation={navigation}
          notes={notes}
          fetchNotes={fetchNotes}
          isEditScreen={isEditScreen}
          noteType={'Estimate'}
          onSelect={this.setFormField}
        />

        <Field
          name="template_name"
          templates={estimateTemplates}
          component={TemplateField}
          label={t('estimates.template')}
          icon={'file-alt'}
          placeholder={t('estimates.template_placeholder')}
          navigation={navigation}
          disabled={disabled}
        />

        <CustomField {...this.props} />
      </DefaultLayout>
    );
  }
}
