import React from 'react';
import * as Linking from 'expo-linking';
import {find} from 'lodash';
import {Field, change, SubmissionError} from 'redux-form';
import styles from './styles';
import {
  InputField,
  DatePickerField,
  ListView,
  DefaultLayout,
  SelectField,
  CurrencyFormat,
  FakeInput,
  SendMail,
  CustomField,
  Label,
  ActionButton,
  View as CtView,
  Notes,
  ItemField
} from '@/components';
import {
  ITEM_ADD,
  ITEM_EDIT,
  ESTIMATE_FORM,
  ESTIMATE_ACTIONS,
  EDIT_ESTIMATE_ACTIONS,
  MARK_AS_ACCEPT,
  MARK_AS_REJECT,
  MARK_AS_SENT,
  setEstimateRefs
} from '../../constants';
import {headerTitle} from '@/styles';
import {TemplateField} from '../TemplateField';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {
  estimateSubTotal,
  estimateTax,
  getTaxValue,
  totalDiscount,
  getCompoundTaxValue,
  finalAmount,
  getItemList,
  estimateCompoundTax
} from '../EstimateCalculation';
import FinalAmount from '../FinalAmount';
import {alertMe, isEmpty} from '@/constants';
import {getApiFormattedCustomFields} from '@/utils';
import EstimateServices from '../../services';
import {CustomerSelectModal, ItemSelectModal} from '@/select-modal';
import {NOTES_TYPE_VALUE} from '@/features/settings/constants';

type IProps = {
  navigation: Object,
  estimateItems: any,
  taxTypes: Object,
  customers: Object,
  getCreateEstimate: Function,
  getEditEstimate: Function,
  clearEstimate: Function,
  createEstimate: Function,
  handleSubmit: Function,
  getCustomers: Function,
  getItems: Function,
  editEstimate: Boolean,
  itemsLoading: Boolean,
  initLoading: Boolean,
  loading: Boolean,
  estimateData: Object,
  items: Object,
  type: String,
  notesReference: any
};

export class Estimate extends React.Component<IProps> {
  estimateRefs: any;
  sendMailRef: any;
  customerReference: any;

  constructor(props) {
    super(props);
    this.estimateRefs = setEstimateRefs.bind(this);
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
        onSuccess: () => {
          this.setState({isLoading: false});
        }
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

  onEditItem = item => {
    const {
      navigation,
      estimateData: {discount_per_item, tax_per_item},
      isAllowToEdit
    } = this.props;
    const {currency} = this.state;

    if (!isAllowToEdit) {
      return;
    }

    navigation.navigate(routes.ESTIMATE_ITEM, {
      item,
      type: ITEM_EDIT,
      currency,
      discount_per_item,
      tax_per_item
    });
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
      initLoading,
      id,
      handleSubmit,
      withLoading,
      estimateData: {estimateTemplates = []} = {}
    } = this.props;

    if (this.state.isLoading || initLoading || withLoading) {
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
      sub_total: estimateSubTotal(),
      tax: estimateTax() + estimateCompoundTax(),
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
      },
      submissionError: errors => handleSubmit(() => this.throwError(errors))()
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

  throwError = errors => {
    if (errors?.estimate_number) {
      throw new SubmissionError({
        estimate_number: 'validation.alreadyTaken'
      });
    }

    alertMe({
      desc: t('validation.wrong')
    });
  };

  estimateItemTotalTaxes = () => {
    const {estimateItems} = this.props;
    let taxes = [];

    if (isEmpty(estimateItems)) {
      return [];
    }

    estimateItems.map(val => {
      val.taxes &&
        val.taxes.filter(tax => {
          let hasSame = false;
          const {tax_type_id, id, amount} = tax;

          taxes = taxes.map(tax2 => {
            if ((tax_type_id || id) === tax2.tax_type_id) {
              hasSame = true;
              return {
                ...tax2,
                amount: amount + tax2.amount,
                tax_type_id: tax2.tax_type_id
              };
            }
            return tax2;
          });

          if (!hasSame) {
            taxes.push({...tax, tax_type_id: tax_type_id || id});
          }
        });
    });
    return taxes;
  };

  navigateToCustomer = () => {
    const {navigation} = this.props;
    const {currency} = this.state;

    navigation.navigate(routes.CUSTOMER, {
      type: 'ADD',
      currency,
      onSelect: item => {
        this.customerReference?.changeDisplayValue?.(item);
        this.setFormField('customer_id', item.id);
        this.setState({currency: item.currency});
      }
    });
  };

  getEstimateItemList = estimateItems => {
    this.setFormField('items', estimateItems);

    const {currency} = this.state;

    if (isEmpty(estimateItems)) {
      return [];
    }

    return estimateItems.map(item => {
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
      case ESTIMATE_ACTIONS.VIEW:
        handleSubmit(val => this.onSubmitEstimate(val, action))();
        break;

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
              params: {
                status: MARK_AS_SENT
              }
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
              params: {
                status: MARK_AS_ACCEPT
              }
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
              params: {
                status: MARK_AS_REJECT
              }
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
              onResult: () => {
                navigation.navigate(routes.MAIN_INVOICES);
              }
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
      onResult: () => EstimateServices.toggleIsEmailSent(true)
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
      estimateItems,
      getItems,
      itemsLoading,
      items,
      initLoading,
      withLoading,
      getCustomers,
      customers,
      formValues,
      customFields,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      loading,
      theme,
      notes,
      getNotes,
      estimateData
    } = this.props;
    const {currency, customerName, markAsStatus, isLoading} = this.state;
    const disabled = !isAllowToEdit;

    const hasCustomField = isEditScreen
      ? formValues && formValues.hasOwnProperty('fields')
      : !isEmpty(customFields);

    let hasCompleteStatus = markAsStatus === 'COMPLETED';

    const dropdownOptions =
      isEditScreen && !initLoading
        ? EDIT_ESTIMATE_ACTIONS(markAsStatus, isAllowToDelete)
        : [];
    let drownDownProps =
      isEditScreen && !initLoading
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
        loading: loading || isLoading
      },
      {
        label: 'button.save',
        onPress: handleSubmit(this.saveEstimate),
        show: isAllowToEdit,
        loading: loading || isLoading
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
        loadingProps={{is: isLoading || initLoading || withLoading}}
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
          selectedItem={formValues?.customer}
          onSelect={item => {
            this.setFormField('customer_id', item.id);
            this.setState({currency: item.currency});
          }}
        />
        <ItemField
          {...this.props}
          selectedItems={estimateItems}
          itemData={estimateData}
          items={getItemList(items)}
          getItems={getItems}
          setFormField={this.setFormField}
        />

        <FinalAmount state={this.state} props={this.props} />

        <Field
          name="reference_number"
          component={InputField}
          hint={t('invoices.referenceNumber')}
          leftIcon={'hashtag'}
          disabled={disabled}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true
          }}
        />

        <Notes
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
