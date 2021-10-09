import React, {Component} from 'react';
import {Field, change, initialize, SubmissionError} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-recurring-invoice-type';
import {routes} from '@/navigation';
import {alertMe, isEmpty, KEYBOARD_TYPE} from '@/constants';
import {
  CREATE_RECURRING_INVOICE_FORM,
  setRecurringInvoiceRefs
} from 'stores/recurring-invoices/types';
import headerTitle from 'utils/header';
import {
  DefaultLayout,
  InputField,
  ActionButton,
  View,
  DatePickerField,
  FakeInput,
  CustomField,
  Label,
  ListView,
  Notes
} from '@/components';
import {
  fetchRecurringInvoiceInitialDetails,
  fetchSingleRecurringInvoice,
  addRecurringInvoice,
  updateRecurringInvoice,
  removeRecurringInvoice
} from 'stores/recurring-invoices/actions';
import {
  CustomerSelectModal,
  FrequencySelectModal,
  ItemSelectModal,
  StatusSelectModal
} from '@/select-modal';
import {TemplateField} from '@/features/invoices/components/TemplateField';
import styles from './create-recurring-invoice-styles';
import {FrequencyField, LimitField} from '../recurring-invoices-common';
import {frequencies} from 'stores/recurring-invoices/helpers';
import {
  itemsSelector,
  statusSelector
} from '@/stores/recurring-invoices/selectors';
import {finalAmount} from '@/features/estimates/components/EstimateCalculation';
import {NOTES_TYPE_VALUE} from '@/features/settings/constants';

export default class CreateRecurringInvoice extends Component<IProps, IStates> {
  recurringInvoiceRefs: any;
  sendMailRef: any;
  customerReference: any;
  constructor(props) {
    super(props);
    this.recurringInvoiceRefs = setRecurringInvoiceRefs.bind(this);
    this.sendMailRef = React.createRef();
    this.customerReference = React.createRef();
    this.state = {
      currency: props?.currency,
      itemList: [],
      customerName: '',
      markAsStatus: null,
      isLoading: true,
      isFetchingInitialData: true
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isCreateScreen, isEditScreen, id, dispatch} = this.props;
    if (isCreateScreen) {
      dispatch(
        fetchRecurringInvoiceInitialDetails(
          this.setState({isFetchingInitialData: false})
        )
      );
      return;
    }

    if (isEditScreen) {
      dispatch(
        fetchSingleRecurringInvoice(id, invoice => this.setInitialData(invoice))
      );
      return;
    }

    this.setState({isFetchingInitialData: false});
  };

  setInitialData = invoice => {
    const {dispatch} = this.props;
    dispatch(initialize(CREATE_RECURRING_INVOICE_FORM, invoice));
    this.setState({isFetchingInitialData: false});
  };

  throwError = errors => {
    let error: any = {};
    errors.email && (error.email = 'validation.alreadyTaken');
    errors.phone && (error.phone = 'validation.alreadyTaken');
    throw new SubmissionError(error);
  };

  onSave = values => {
    const {id, isCreateScreen, navigation, dispatch, handleSubmit} = this.props;
    const {isFetchingInitialData} = this.state;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    const params = {
      id,
      params: values,
      navigation,
      submissionError: errors => handleSubmit(() => this.throwError(errors))()
    };

    isCreateScreen
      ? dispatch(addRecurringInvoice(params))
      : dispatch(updateRecurringInvoice(params));
  };

  removeRecurringInvoice = () => {
    const {id, navigation, dispatch} = this.props;
    function alreadyUsedAlert() {
      alertMe({
        title: t('users.text_already_used')
      });
    }

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('users.text_alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() =>
      dispatch(
        removeRecurringInvoice(id, navigation, val => alreadyUsedAlert())
      )
    );
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

  getInvoiceItemList = invoiceItems => {
    this.setFormField('items', invoiceItems);

    const {currency} = this.state;

    if (isEmpty(invoiceItems)) {
      return [];
    }

    return invoiceItems.map(item => {
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

  render() {
    const {
      isEditScreen,
      isAllowToEdit,
      formValues,
      customers,
      fetchStatus,
      getCustomers,
      invoiceItems,
      items,
      getItems,
      currency,
      customFields,
      navigation,
      statusList,
      theme,
      notes,
      getNotes,
      invoiceData: {invoiceTemplates, tax_per_item} = {},
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
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const loading =
      isFetchingInitialData || this.props.isSaving || this.props.isDeleting;
    const bottomAction = [
      {
        label: 'button.save',
        onPress: this.props.handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading
      },
      {
        label: 'button.remove',
        onPress: this.removeRecurringInvoice,
        bgColor: 'btn-danger',
        show: isEditScreen && this.props.isAllowToDelete,
        loading
      }
    ];
    this.recurringInvoiceRefs(this);
    const headerProps = {
      leftIconPress: () => navigation.goBack(null),
      title: headerTitle(this.props),
      placement: 'center',
      ...(isAllowToEdit && {
        rightIcon: 'save',
        rightIconProps: {solid: true},
        rightIconPress: this.props.handleSubmit(this.onSave)
      })
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="customer_id"
          getCustomers={getCustomers}
          customers={customers}
          component={CustomerSelectModal}
          onSelect={item => {
            this.setFormField('customer_id', item.id);
            this.setState({currency: item.currency});
          }}
          rightIconPress={this.navigateToCustomer}
          reference={ref => (this.customerReference = ref)}
          disabled={disabled}
        />

        <Field
          name={'formated_starts_at'}
          isRequired
          component={DatePickerField}
          label={t('recurring_invoices.start_date')}
          icon={'calendar-alt'}
          onChangeCallback={val => this.setFormField('formated_starts_at', val)}
          disabled={disabled}
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
          statusList={statusSelector(statusList)}
          fetchStatus={fetchStatus}
          component={StatusSelectModal}
          placeholder={status ?? t('recurring_invoices.status.title')}
          onSelect={item => {
            this.setFormField('status', item);
          }}
          disabled={disabled}
        />
        <FrequencyField
          frequencyField={{
            name: 'frequency',
            value: frequency
          }}
          frequencyPickerField={{
            name: 'frequency_picker',
            value: frequency_picker
          }}
          onChangeCallback={val => {
            if (!val) {
              return;
            }
            this.setFormField('frequency', val);
          }}
          callbackWhenMount={() => {
            this.setFormField('frequency_picker', frequency);
          }}
        />

        <Label isRequired theme={theme} style={styles.label}>
          {t('invoices.items')}
        </Label>

        <ListView
          items={this.getInvoiceItemList(invoiceItems)}
          itemContainer={styles.itemContainer(theme, disabled)}
          leftTitleStyle={styles.itemLeftTitle(theme)}
          leftSubTitleLabelStyle={[
            styles.itemLeftSubTitle(theme),
            styles.itemLeftSubTitleLabel
          ]}
          leftSubTitleStyle={styles.itemLeftSubTitle(theme)}
          rightTitleStyle={styles.itemRightTitle(theme)}
          backgroundColor={
            !disabled
              ? theme.thirdBgColor
              : theme?.input?.disableBackgroundColor
          }
          onPress={this.onEditItem}
          parentViewStyle={{marginVertical: 4}}
        />

        <Field
          name="items"
          items={itemsSelector(items)}
          getItems={getItems}
          component={ItemSelectModal}
          // loading={itemsLoading}
          disabled={disabled}
          onSelect={item => {
            navigation.navigate(routes.INVOICE_ITEM, {
              item,
              currency,
              type: ITEM_ADD,
              tax_per_item
            });
          }}
          rightIconPress={() =>
            navigation.navigate(routes.INVOICE_ITEM, {
              type: ITEM_ADD,
              currency,
              tax_per_item
            })
          }
        />
        <Notes
          navigation={navigation}
          notes={notes}
          getNotes={getNotes}
          isEditScreen={isEditScreen}
          noteType={NOTES_TYPE_VALUE.RECURRING_INVOICE}
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
