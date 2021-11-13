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
  BaseInputPrefix,
  BaseButtonGroup,
  BaseButton
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
import {TemplateField} from '@/components';
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
import {alertMe, isEmpty} from '@/constants';
import {getApiFormattedCustomFields} from '@/utils';
import {CustomerSelectModal} from '@/select-modal';
import {setCalculationRef} from 'stores/common/helpers';
import {showNotification} from '@/utils';
import {IProps, IStates} from './create-estimate-type';
import {initialValues} from 'stores/estimate/helpers';
import {
  fetchEstimateInitialDetails,
  fetchSingleEstimate,
  convertToInvoice,
  changeEstimateStatus,
  removeEstimate,
  addEstimate,
  updateEstimate
} from 'stores/estimate/actions';

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
      isFetchingInitialData: true
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isEditScreen, id, dispatch} = this.props;

    if (isEditScreen) {
      dispatch(fetchSingleEstimate(id, res => this.setInitialData(res)));
      return;
    }
    dispatch(fetchEstimateInitialDetails(() => this.setInitialData(null)));
    return;
  };

  setInitialData = res => {
    const {
      dispatch,
      estimateData: {estimateTemplates} = {},
      estimateData,
      route
    } = this.props;
    let values = {
      ...initialValues(estimateTemplates),
      ...estimateData,
      estimate_number: estimateData?.nextNumber
    };
    if (res) {
      const {data, meta} = res;
      values = {
        ...values,
        ...data,
        estimate_number: data.estimate_no ?? estimateData?.nextNumber,
        prefix: meta.estimatePrefix ?? estimateData?.prefix
      };
      this.setState({currency: data?.customer?.currency});
    }

    const customer = route?.params?.customer;
    if (customer) {
      values = {
        ...values,
        customer,
        customer_id: customer.id
      };
      this.setState({currency: customer.currency});
    }

    dispatch(initialize(CREATE_ESTIMATE_FORM, values));
    this.setState({isFetchingInitialData: false});
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
      estimateData: {estimateTemplates = []} = {}
    } = this.props;

    if (
      this.state.isFetchingInitialData ||
      isFetchingInitialData ||
      isSaving ||
      isDeleting
    ) {
      return;
    }

    if (finalAmount() < 0) {
      alert(t('estimates.alert.less_amount'));
      return;
    }

    let estimate = {
      ...values,
      estimate_number: `${values.prefix}-${values.estimate_number}`,
      estimate_no: values.estimate_number,
      total: finalAmount(),
      sub_total: total(),
      tax: tax() + CompoundTax(),
      discount_val: totalDiscount(),
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
    const url = values?.estimatePdfUrl;
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
        this.sendMailRef?.onToggle();
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

  sendEmail = params => {
    const {navigation, dispatch, id} = this.props;

    dispatch(
      changeEstimateStatus({
        id,
        action: `${id}/send`,
        navigation,
        params,
        onSuccess: () =>
          showNotification({message: t('notification.estimate_sent')})
      })
    );
  };

  sendMailComponent = () => {
    return (
      <SendMail
        reference={ref => (this.sendMailRef = ref)}
        headerTitle={'header.send_mail_estimate'}
        alertDesc={'estimates.alert.send_estimate'}
        user={this.props?.formValues?.customer}
        subject="New Estimate"
        body="estimate_mail_body"
        onSendMail={params => this.sendEmail(params)}
      />
    );
  };

  navigateToCustomer = () => {
    const {navigation} = this.props;
    const {currency} = this.state;

    dismissRoute(routes.CREATE_CUSTOMER, () => {
      navigation.navigate(routes.CREATE_CUSTOMER, {
        type: 'ADD',
        currency,
        onSelect: item => {
          this.customerReference?.changeDisplayValue?.(item);
          this.setFormField('customer_id', item.id);
          this.setState({currency: item.currency});
        }
      });
    });
  };

  render() {
    const {
      navigation,
      handleSubmit,
      estimateData: {estimateTemplates} = {},
      selectedItems,
      items,
      fetchCustomers,
      customers,
      formValues,
      formValues: {prefix, customer, status},
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
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;

    const hasCustomField = isEditScreen
      ? formValues && formValues.hasOwnProperty('fields')
      : !isEmpty(customFields);

    let hasCompleteStatus = status === 'COMPLETED';

    const dropdownOptions =
      isEditScreen && !isFetchingInitialData
        ? EDIT_ESTIMATE_ACTIONS(status, isAllowToDelete)
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
        {isEditScreen && !hasCompleteStatus && this.sendMailComponent()}

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
          component={BaseInputPrefix}
          isRequired
          label={t('estimates.estimate_number')}
          prefix={prefix}
          fieldName="estimate_number"
          disabled={disabled}
        />

        <Field
          name="customer_id"
          fetchCustomers={fetchCustomers}
          customers={customers}
          component={CustomerSelectModal}
          selectedItem={customer}
          onSelect={item => {
            this.setFormField('customer_id', item.id);
            this.setState({currency: item.currency});
          }}
          rightIconPress={this.navigateToCustomer}
          reference={ref => (this.customerReference = ref)}
          disabled={disabled}
        />
        <ItemField
          {...this.props}
          currency={this.state.currency}
          selectedItems={selectedItems}
          items={getItemList(items)}
          screen="estimate"
          setFormField={this.setFormField}
        />

        <FinalAmount {...this.props} currency={this.state.currency} />

        <Field
          name="reference_number"
          component={BaseInput}
          hint={t('invoices.reference_number')}
          leftIcon={'hashtag'}
          disabled={disabled}
        />

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

        {hasCustomField && <CustomField {...this.props} />}
      </DefaultLayout>
    );
  }
}
