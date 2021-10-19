import React from 'react';
import * as Linking from 'expo-linking';
import {find} from 'lodash';
import {Field, change} from 'redux-form';
import {TemplateField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {alertMe, isEmpty} from '@/constants';
import {
  InputField,
  DatePickerField,
  DefaultLayout,
  FakeInput,
  SendMail,
  CustomField,
  View as CtView,
  ActionButton,
  Notes,
  ItemField,
  FinalAmount
} from '@/components';
import {
  INVOICE_FORM,
  INVOICE_ACTIONS,
  EDIT_INVOICE_ACTIONS
} from '../../constants';
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
import {getApiFormattedCustomFields, showNotification} from '@/utils';
import {CustomerSelectModal} from '@/select-modal';
import {NOTES_TYPE_VALUE} from '@/features/settings/constants';
import {setCalculationRef} from 'stores/common/helpers';

type IProps = {
  navigation: any,
  selectedItems: any,
  customers: Object,
  getCreateInvoice: Function,
  getEditInvoice: Function,
  clearInvoice: Function,
  createInvoice: Function,
  handleSubmit: Function,
  getCustomers: Function,
  getItems: Function,
  editInvoice: Boolean,
  initLoading: Boolean,
  loading: Boolean,
  items: Object,
  type: String,
  changeInvoiceStatus: Function,
  formValues: any,
  invoiceData: any,
  id: number,
  withLoading: boolean,
  customFields: Array<any>
};

type IStates = {
  currency: any,
  itemList: Array<any>,
  customerName: string,
  markAsStatus: string,
  isLoading: boolean
};

export class Invoice extends React.Component<IProps, IStates> {
  invoiceRefs: any;
  sendMailRef: any;
  customerReference: any;

  constructor(props) {
    super(props);
    this.invoiceRefs = setCalculationRef?.bind?.(this);
    this.sendMailRef = React.createRef();
    this.customerReference = React.createRef();

    this.state = {
      currency: props?.currency,
      itemList: [],
      customerName: '',
      markAsStatus: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.setInitialValues();
  }

  componentWillUnmount() {
    const {clearInvoice} = this.props;
    clearInvoice();
    this.invoiceRefs(undefined);
  }

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

  setInitialValues = () => {
    const {getCreateInvoice, getEditInvoice, isEditScreen, id} = this.props;

    if (!isEditScreen) {
      getCreateInvoice({
        onSuccess: () => {
          this.setState({isLoading: false});
        }
      });
      return;
    }

    if (isEditScreen) {
      getEditInvoice({
        id,
        onSuccess: ({customer, status}) => {
          this.setState({
            currency: customer?.currency,
            customerName: customer?.name,
            markAsStatus: status,
            isLoading: false
          });
        }
      });
      return;
    }
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(INVOICE_FORM, field, value));
  };

  onDraft = handleSubmit => {
    const {navigation, isEditScreen} = this.props;
    const {isLoading} = this.state;

    if (isLoading) {
      navigation.navigate(routes.MAIN_INVOICES);
      return;
    }

    if (isEditScreen) {
      navigation.goBack(null);
      return;
    }

    alertMe({
      title: t('invoices.alert.draftTitle'),
      showCancel: true,
      cancelText: t('alert.action.discard'),
      cancelPress: () => navigation.navigate(routes.MAIN_INVOICES),
      okText: t('alert.action.saveAsDraft'),
      okPress: handleSubmit(this.draftInvoice)
    });
  };

  onSubmitInvoice = (values, status) => {
    const {
      createInvoice,
      navigation,
      editInvoice,
      id,
      initLoading,
      withLoading,
      isCreateScreen,
      invoiceData: {invoiceTemplates = []} = {}
    } = this.props;

    if (this.state.isLoading || initLoading || withLoading) {
      return;
    }

    if (finalAmount() < 0) {
      alert(t('invoices.alert.lessAmount'));
      return;
    }

    let invoice = {
      ...values,
      invoice_number: `${values.prefix}-${values.invoice_number}`,
      invoice_no: values.invoice_number,
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
      invoice.invoiceSend = true;
    }

    invoice.invoice_template_id = find(invoiceTemplates, {
      name: invoice?.template_name
    })?.id;

    const params = {
      invoice: {
        ...invoice,
        id,
        customFields: getApiFormattedCustomFields(values?.customFields)
      },
      navigation,
      status,
      onSuccess: url => {
        if (status === 'download') {
          Linking.openURL(url);
          return;
        }
        navigation.navigate(routes.MAIN_INVOICES);
      }
    };

    isCreateScreen ? createInvoice(params) : editInvoice(params);
  };

  downloadInvoice = values => {
    this.onSubmitInvoice(values, INVOICE_ACTIONS.VIEW);
  };

  saveInvoice = values => {
    this.onSubmitInvoice(values, 'save');
  };

  draftInvoice = values => {
    this.onSubmitInvoice(values, 'draft');
  };

  removeInvoice = () => {
    const {removeInvoice, navigation, id} = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('invoices.alert.removeDescription'),
      showCancel: true,
      okPress: () =>
        removeInvoice({
          id,
          onResult: res => {
            if (res?.success) {
              navigation.navigate(routes.MAIN_INVOICES);
              return;
            }

            if (res?.data?.errors && res?.data?.errors?.['ids.0']) {
              alertMe({
                title: t('invoices.alert.paymentAttachedTitle'),
                desc: t('invoices.alert.paymentAttachedDescription')
              });
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
    const {navigation, formValues, changeInvoiceStatus, id} = this.props;

    switch (action) {
      case INVOICE_ACTIONS.SEND:
        this.sendMailRef?.onToggle();
        break;

      case INVOICE_ACTIONS.MARK_AS_SENT:
        alertMe({
          title: t('alert.title'),
          desc: t('invoices.alert.markAsSent'),
          showCancel: true,
          okPress: () =>
            changeInvoiceStatus({
              id,
              action: `${id}/status`,
              navigation,
              params: {status: 'SENT'},
              onResult: () =>
                showNotification({
                  message: t('notification.invoice_marked_as_sent')
                })
            })
        });
        break;

      case INVOICE_ACTIONS.RECORD_PAYMENT:
        const {
          customer_id,
          due_amount,
          sub_total,
          prefix,
          invoice_number
        } = formValues;
        const invoice = {
          customer_id,
          id,
          due: {due_amount, sub_total},
          number: `${prefix}-${invoice_number}`
        };

        navigation.navigate(routes.PAYMENT, {
          type: 'ADD',
          invoice,
          hasRecordPayment: true
        });
        break;

      case INVOICE_ACTIONS.CLONE:
        alertMe({
          title: t('alert.title'),
          desc: t('invoices.alert.clone'),
          showCancel: true,
          okPress: () =>
            changeInvoiceStatus({
              id,
              action: `${id}/clone`,
              navigation,
              onResult: () =>
                showNotification({message: t('notification.invoice_cloned')})
            })
        });

        break;

      case INVOICE_ACTIONS.DELETE:
        this.removeInvoice();
        break;

      default:
        break;
    }
  };

  sendEmail = params => {
    const {navigation, changeInvoiceStatus, id} = this.props;

    changeInvoiceStatus({
      id,
      action: `${id}/send`,
      navigation,
      params,
      onResult: () =>
        showNotification({message: t('notification.invoice_sent')})
    });
  };

  sendMailComponent = () => {
    return (
      <SendMail
        mailReference={ref => (this.sendMailRef = ref)}
        headerTitle={'header.sendMailInvoice'}
        alertDesc={'invoices.alert.sendInvoice'}
        user={this.props.formValues?.customer}
        subject="New Invoice"
        body="invoice_mail_body"
        onSendMail={params => this.sendEmail(params)}
      />
    );
  };

  render() {
    const {
      navigation,
      handleSubmit,
      invoiceData: {invoiceTemplates, discount_per_item, tax_per_item} = {},
      selectedItems,
      getItems,
      items,
      initLoading,
      getCustomers,
      customers,
      formValues,
      withLoading,
      customFields,
      isAllowToEdit,
      isAllowToDelete,
      isEditScreen,
      loading,
      notes,
      getNotes
    } = this.props;
    const {customerName, markAsStatus, isLoading} = this.state;
    const disabled = !isAllowToEdit;
    const hasCustomField = isEditScreen
      ? formValues && formValues.hasOwnProperty('fields')
      : !isEmpty(customFields);

    let hasSentStatus = markAsStatus === 'SENT' || markAsStatus === 'VIEWED';
    let hasCompleteStatus = markAsStatus === 'COMPLETED';

    const dropdownOptions =
      isEditScreen && !initLoading
        ? EDIT_INVOICE_ACTIONS(
            hasSentStatus,
            hasCompleteStatus,
            isAllowToDelete
          )
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
      let title = 'header.addInvoice';
      if (isEditScreen && !isAllowToEdit) title = 'header.viewInvoice';
      if (isEditScreen && isAllowToEdit) title = 'header.editInvoice';

      return t(title);
    };

    this.invoiceRefs(this);

    const bottomAction = [
      {
        label: 'button.viewPdf',
        onPress: handleSubmit(this.downloadInvoice),
        type: 'btn-outline',
        show: isAllowToEdit,
        loading: loading || isLoading
      },
      {
        label: 'button.save',
        onPress: handleSubmit(this.saveInvoice),
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
          ...(!isEditScreen && {
            rightIcon: 'save',
            rightIconProps: {solid: true},
            rightIconPress: handleSubmit(this.downloadInvoice)
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
              name={'invoice_date'}
              isRequired
              component={DatePickerField}
              label={t('invoices.invoiceDate')}
              icon={'calendar-alt'}
              onChangeCallback={val => this.setFormField('invoice_date', val)}
              disabled={disabled}
            />
          </CtView>
          <CtView flex={0.07} />
          <CtView flex={1} justify-between>
            <Field
              name="due_date"
              isRequired
              component={DatePickerField}
              label={t('invoices.dueDate')}
              icon={'calendar-alt'}
              onChangeCallback={val => this.setFormField('due_date', val)}
              disabled={disabled}
            />
          </CtView>
        </CtView>

        <Field
          name="invoice_number"
          component={FakeInput}
          label={t('invoices.invoiceNumber')}
          isRequired
          prefixProps={{
            fieldName: 'invoice_number',
            prefix: formValues?.prefix,
            icon: 'hashtag',
            iconSolid: false
          }}
          disabled={disabled}
        />

        <Field
          name="customer_id"
          getCustomers={getCustomers}
          customers={customers}
          component={CustomerSelectModal}
          placeholder={
            customerName ? customerName : t('invoices.customerPlaceholder')
          }
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
          selectedItems={selectedItems}
          discount_per_item={discount_per_item}
          tax_per_item={tax_per_item}
          items={getItemList(items)}
          getItems={getItems}
          setFormField={this.setFormField}
          screen="invoice"
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
          noteType={NOTES_TYPE_VALUE.INVOICE}
          onSelect={this.setFormField}
        />

        <Field
          name="template_name"
          templates={invoiceTemplates ?? []}
          component={TemplateField}
          label={t('invoices.template')}
          icon={'file-alt'}
          placeholder={t('invoices.templatePlaceholder')}
          navigation={navigation}
          disabled={disabled}
        />

        {hasCustomField && <CustomField {...this.props} type={null} />}
      </DefaultLayout>
    );
  }
}
