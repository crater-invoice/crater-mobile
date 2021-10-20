import React from 'react';
import * as Linking from 'expo-linking';
import {find} from 'lodash';
import {Field, change} from 'redux-form';
import {
  InputField,
  DatePickerField,
  DefaultLayout,
  FakeInput,
  SendMail,
  CustomField,
  ActionButton,
  View as CtView,
  Notes,
  ItemField,
  FinalAmount
} from '@/components';
import {
  ESTIMATE_FORM,
  ESTIMATE_ACTIONS,
  EDIT_ESTIMATE_ACTIONS,
  MARK_AS_ACCEPT,
  MARK_AS_REJECT,
  MARK_AS_SENT
} from '../../constants';
import {headerTitle} from '@/styles';
import {TemplateField} from '@/components';
import {routes} from '@/navigation';
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
import {NOTES_TYPE_VALUE} from '@/features/settings/constants';
import {setCalculationRef} from '@/stores/common/helpers';
import {showNotification} from '@/utils';

type IProps = {
  navigation: Object,
  selectedItems: any,
  customers: Object,
  getCreateEstimate: Function,
  getEditEstimate: Function,
  clearEstimate: Function,
  createEstimate: Function,
  handleSubmit: Function,
  getCustomers: Function,
  getItems: Function,
  editEstimate: Boolean,
  estimateData: Object,
  items: Object,
  type: String,
  notesReference: any
};

type IStates = {
  currency: any,
  customerName: string,
  markAsStatus: string,
  isLoading: boolean
};

export class Estimate extends React.Component<IProps, IStates> {
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
      customerName: '',
      markAsStatus: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.setInitialValues();
  }

  componentWillUnmount() {
    const {clearEstimate} = this.props;
    clearEstimate();
    this.estimateRefs(undefined);
  }

  setInitialValues = () => {
    const {getCreateEstimate, getEditEstimate, isEditScreen, id} = this.props;

    if (!isEditScreen) {
      getCreateEstimate({
        onSuccess: () => this.setState({isLoading: false})
      });
      return;
    }

    if (isEditScreen) {
      getEditEstimate({
        id,
        onSuccess: ({customer, status}) => {
          this.setState({
            currency: customer.currency,
            customerName: customer.name,
            markAsStatus: status,
            isLoading: false
          });
        }
      });
      return;
    }
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(ESTIMATE_FORM, field, value));
  };

  onDraft = handleSubmit => {
    const {navigation, isEditScreen} = this.props;
    const {isLoading} = this.state;

    if (isLoading) {
      navigation.navigate(routes.ESTIMATE_LIST);
      return;
    }

    if (isEditScreen) {
      navigation.navigate(routes.ESTIMATE_LIST);
      return;
    }

    alertMe({
      title: t('estimates.alert.draftTitle'),
      showCancel: true,
      cancelText: t('alert.action.discard'),
      cancelPress: () => navigation.navigate(routes.ESTIMATE_LIST),
      okText: t('alert.action.saveAsDraft'),
      okPress: handleSubmit(this.draftEstimate)
    });
  };

  onSubmitEstimate = (values, status = 'draft') => {
    const {
      isCreateScreen,
      createEstimate,
      navigation,
      editEstimate,
      isFetchingInitialData,
      id,
      withLoading,
      estimateData: {estimateTemplates = []} = {}
    } = this.props;

    if (this.state.isLoading || isFetchingInitialData || withLoading) {
      return;
    }

    if (finalAmount() < 0) {
      alert(t('estimates.alert.lessAmount'));
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
      onSuccess: url => {
        if (status === 'download') {
          Linking.openURL(url);
          return;
        }
        navigation.navigate(routes.ESTIMATE_LIST);
      }
    };

    isCreateScreen ? createEstimate(params) : editEstimate(params);
  };

  downloadEstimate = values => {
    this.onSubmitEstimate(values, ESTIMATE_ACTIONS.VIEW);
  };

  saveEstimate = values => {
    this.onSubmitEstimate(values, 'save');
  };

  draftEstimate = values => {
    this.onSubmitEstimate(values, 'draft');
  };

  removeEstimate = () => {
    const {removeEstimate, navigation, id} = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('estimates.alert.removeDescription'),
      showCancel: true,
      okPress: () =>
        removeEstimate({
          id,
          onResult: res => {
            if (res?.success) {
              navigation.navigate(routes.ESTIMATE_LIST);
              return;
            }

            alertMe({
              desc: t('validation.wrong')
            });
          }
        })
    });
  };

  onOptionSelect = action => {
    const {
      navigation,
      convertToInvoice,
      handleSubmit,
      changeEstimateStatus,
      id
    } = this.props;

    switch (action) {
      case ESTIMATE_ACTIONS.SEND:
        this.sendMailRef?.onToggle();
        break;

      case ESTIMATE_ACTIONS.MARK_AS_SENT:
        alertMe({
          title: t('alert.title'),
          desc: t('estimates.alert.markAsSent'),
          showCancel: true,
          okPress: () =>
            changeEstimateStatus?.({
              id,
              action: `${id}/status`,
              navigation,
              params: {status: MARK_AS_SENT},
              onResult: () =>
                showNotification({
                  message: t('notification.estimate_mark_as_sent')
                })
            })
        });
        break;

      case ESTIMATE_ACTIONS.MARK_AS_ACCEPTED:
        alertMe({
          title: t('alert.title'),
          desc: t('estimates.alert.markAsAccept'),
          showCancel: true,
          okPress: () =>
            changeEstimateStatus?.({
              id,
              action: `${id}/status`,
              navigation,
              params: {status: MARK_AS_ACCEPT},
              onResult: () =>
                showNotification({
                  message: t('notification.estimate_marked_as_accepted')
                })
            })
        });
        break;

      case ESTIMATE_ACTIONS.MARK_AS_REJECTED:
        alertMe({
          title: t('alert.title'),
          desc: t('estimates.alert.markAsReject'),
          showCancel: true,
          okPress: () =>
            changeEstimateStatus?.({
              id,
              action: `${id}/status`,
              navigation,
              params: {status: MARK_AS_REJECT},
              onResult: () =>
                showNotification({
                  message: t('notification.estimate_marked_as_rejected')
                })
            })
        });
        break;

      case ESTIMATE_ACTIONS.CONVERT_TO_INVOICE:
        alertMe({
          desc: t('estimates.alert.convertToInvoiceDescription'),
          showCancel: true,
          okPress: () =>
            convertToInvoice({
              id,
              onResult: () => navigation.navigate(routes.MAIN_INVOICES)
            })
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
    const {navigation, changeEstimateStatus, id} = this.props;

    changeEstimateStatus?.({
      id,
      action: `${id}/send`,
      navigation,
      params,
      onResult: () =>
        showNotification({message: t('notification.estimate_sent')})
    });
  };

  sendMailComponent = () => {
    return (
      <SendMail
        mailReference={ref => (this.sendMailRef = ref)}
        headerTitle={'header.sendMailEstimate'}
        alertDesc={'estimates.alert.sendEstimate'}
        user={this.props?.formValues?.customer}
        subject="New Estimate"
        body="estimate_mail_body"
        onSendMail={params => this.sendEmail(params)}
      />
    );
  };

  render() {
    const {
      navigation,
      handleSubmit,
      estimateData: {estimateTemplates, discount_per_item, tax_per_item} = {},
      selectedItems,
      getItems,
      items,
      isFetchingInitialData,
      withLoading,
      getCustomers,
      customers,
      formValues,
      customFields,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isSaving,
      notes,
      getNotes
    } = this.props;
    const {customerName, markAsStatus, isLoading} = this.state;
    const disabled = !isAllowToEdit;

    const hasCustomField = isEditScreen
      ? formValues && formValues.hasOwnProperty('fields')
      : !isEmpty(customFields);

    let hasCompleteStatus = markAsStatus === 'COMPLETED';

    const dropdownOptions =
      isEditScreen && !isFetchingInitialData
        ? EDIT_ESTIMATE_ACTIONS(markAsStatus, isAllowToDelete)
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
      let title = 'header.addEstimate';
      if (isEditScreen && !isAllowToEdit) title = 'header.viewEstimate';
      if (isEditScreen && isAllowToEdit) title = 'header.editEstimate';

      return t(title);
    };

    this.estimateRefs(this);

    const bottomAction = [
      {
        label: 'button.viewPdf',
        onPress: handleSubmit(this.downloadEstimate),
        type: 'btn-outline',
        show: isAllowToEdit,
        loading: isSaving || isLoading
      },
      {
        label: 'button.save',
        onPress: handleSubmit(this.saveEstimate),
        show: isAllowToEdit,
        loading: isSaving || isLoading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
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
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: isLoading || isFetchingInitialData || withLoading}}
        contentProps={{withLoading}}
        dropdownProps={drownDownProps}
        bodyStyle={`px-22 pt-10 pb-15 opacity-${withLoading ? 80 : 100}`}
      >
        {isEditScreen && !hasCompleteStatus && this.sendMailComponent()}

        <CtView flex={1} flex-row>
          <CtView flex={1} justify-between>
            <Field
              name={'estimate_date'}
              isRequired
              component={DatePickerField}
              label={t('estimates.estimateDate')}
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
              component={DatePickerField}
              label={t('estimates.expiryDate')}
              icon={'calendar-alt'}
              onChangeCallback={val => this.setFormField('expiry_date', val)}
              disabled={disabled}
            />
          </CtView>
        </CtView>

        <Field
          name="estimate_number"
          component={FakeInput}
          label={t('estimates.estimateNumber')}
          isRequired
          prefixProps={{
            prefix: formValues?.prefix,
            fieldName: 'estimate_number',
            icon: 'hashtag',
            iconSolid: false
          }}
          disabled={disabled}
        />

        <Field
          name="customer_id"
          component={CustomerSelectModal}
          customers={customers}
          getCustomers={getCustomers}
          disabled={disabled}
          placeholder={
            customerName ? customerName : t('invoices.customerPlaceholder')
          }
          selectedItem={formValues?.customer}
          onSelect={item => {
            this.setFormField('customer_id', item.id);
            this.setState({currency: item.currency});
          }}
        />
        <ItemField
          {...this.props}
          selectedItems={selectedItems}
          discount_per_item={discount_per_item}
          tax_per_item={tax_per_item}
          items={getItemList(items)}
          getItems={getItems}
          screen="estimate"
          setFormField={this.setFormField}
        />

        <FinalAmount
          discount_per_item={discount_per_item}
          tax_per_item={tax_per_item}
          state={this.state}
          props={this.props}
        />

        <Field
          name="reference_number"
          component={InputField}
          hint={t('invoices.referenceNumber')}
          leftIcon={'hashtag'}
          disabled={disabled}
        />

        <Notes
          {...this.props}
          navigation={navigation}
          notes={notes}
          getNotes={getNotes}
          isEditScreen={isEditScreen}
          noteType={NOTES_TYPE_VALUE.ESTIMATE}
          onSelect={this.setFormField}
        />

        <Field
          name="template_name"
          templates={estimateTemplates}
          component={TemplateField}
          label={t('estimates.template')}
          icon={'file-alt'}
          placeholder={t('estimates.templatePlaceholder')}
          navigation={navigation}
          disabled={disabled}
        />

        {hasCustomField && <CustomField {...this.props} type={null} />}
      </DefaultLayout>
    );
  }
}
