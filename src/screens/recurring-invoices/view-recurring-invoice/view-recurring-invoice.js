import React, {Component} from 'react';
import {Field, change, initialize, SubmissionError} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './view-recurring-invoice-type';
import {routes} from '@/navigation';
import {alertMe, definePlatformParam, isEmpty} from '@/constants';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoices/types';
import headerTitle from 'utils/header';
import {
  DefaultLayout,
  ActionButton,
  DatePickerField,
  CustomField,
  Notes,
  ItemField,
  ToggleSwitch,
  FinalAmount,
  InputField,
  MainLayout,
  ViewData,
  ListView,
  InfiniteScroll,
  ScrollView,
  CurrencyFormat
} from '@/components';
import {
  fetchRecurringInvoiceInitialDetails,
  fetchSingleRecurringInvoice,
  addRecurringInvoice,
  updateRecurringInvoice,
  removeRecurringInvoice,
  fetchNextInvoiceAt
} from 'stores/recurring-invoices/actions';
import {CustomerSelectModal, StatusSelectModal} from '@/select-modal';
import {TemplateField} from '@/components';
import styles from './view-recurring-invoice-styles';
import {FrequencyField, LimitField} from '../recurring-invoices-common';
import {
  formatItems,
  statusSelector
} from '@/stores/recurring-invoices/selectors';
import {NOTES_TYPE_VALUE} from '@/features/settings/constants';
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
import {setCalculationRef} from '@/stores/common/helpers';
import {getApiFormattedCustomFields} from '@/utils';
import {ARROW_ICON} from '@/assets';
import {FlatList, Text, View} from 'react-native';
import {colors} from '@/styles';
import {ListItem} from 'react-native-elements';

export default class ViewRecurringInvoice extends Component<IProps, IStates> {
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
      itemList: [],
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
    const {
      navigation,
      id,
      handleSubmit,
      isCreateScreen,
      dispatch,
      isSaving,
      isDeleting
    } = this.props;

    if (isSaving || isDeleting || this.state.isFetchingInitialData) {
      return;
    }

    if (finalAmount() < 0) {
      alertMe(t('invoices.alert.lessAmount'));
      return;
    }

    let invoice = {
      ...values,
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

    const params = {
      invoice: {
        ...invoice,
        id,
        customFields: getApiFormattedCustomFields(values?.customFields)
      },
      navigation,
      onSuccess: () => {
        navigation.navigate(routes.RECURRING_INVOICES);
      },
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
      dispatch
    } = this.props;
    const params = {
      starts_at,
      frequency
    };

    dispatch(
      fetchNextInvoiceAt({
        params,
        onSuccess: data => {
          if (data?.success)
            this.setFormField('next_invoice_at', data?.next_invoice_at);
        }
      })
    );
  };

  onAddInvoice = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_RECURRING_INVOICE, {type: 'ADD'});
  };
  invoiceList = ({item}, index) => {
    const {theme} = this.props;
    return (
      <ListItem
        key={index}
        title={item?.title}
        rightTitleStyle={{
          fontSize: 18,
          color: theme?.listItem?.primary?.color,
          fontWeight: '500',
          fontFamily: fonts.semiBold,
          textAlign: 'left'
        }}
        containerStyle={{
          backgroundColor: theme?.backgroundColor
        }}
        rightTitle={
          item.amount ? (
            <CurrencyFormat
              amount={item.amount}
              currency={item.currency}
              currencyStyle={{
                marginTop: definePlatformParam(-1.5, -6)
              }}
            />
          ) : (
            item.rightTitle
          )
        }
      />
    );
  };
  render() {
    const {
      isEditScreen,
      isAllowToEdit,
      formValues,
      customers,
      fetchStatus,
      getCustomers,
      selectedItems,
      items,
      getItems,
      customFields,
      navigation,
      route,
      formValues: {
        customer,
        starts_at,
        next_invoice_at,
        limit_by,
        limit_date,
        limit_count,
        status,
        frequency,
        invoices
      },
      theme
    } = this.props;
    const hasCustomField = isEditScreen
      ? formValues && formValues.hasOwnProperty('fields')
      : !isEmpty(customFields);
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const loading =
      isFetchingInitialData || this.props.isSaving || this.props.isDeleting;

    const headerProps = {
      title: t('header.recurring_invoices'),
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.RECURRING_INVOICES),
      placement: 'center',
      route,
      rightIcon: 'ellipsis-h',
      rightIconPress: this.onAddInvoice
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        loadingProps={{is: isFetchingInitialData}}
      >
        <View
          style={{
            // backgroundColor: 'pink',
            flexDirection: 'column'
          }}
        >
          <View
            style={{
              flex: 0.1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{fontSize: 20}}>Basic Info</Text>
          </View>
          {/* <View
            style={{
              // backgroundColor: 'blue',
              flex: 0.9,
              flexDirection: 'row'
            }}
          >
            <View style={{flex: 0.5, height: '13%'}}>
              <Text style={{color: colors.gray5, fontSize: 15}}>
                Customer Name
              </Text>
              <Text style={{fontSize: 18}}>{customer?.name}</Text>
            </View>
            <View style={{flex: 0.5, height: '13%'}}>
              <Text style={{color: colors.gray5, fontSize: 15}}>
                Start Date
              </Text>
              <Text style={{fontSize: 18}}>{starts_at}</Text>
            </View>
          </View> */}
          <ViewData icon={'user'} label={'Customer'} values={customer?.name} />
          <ViewData
            icon={'calendar-alt'}
            label={t('recurring_invoices.start_date')}
            values={starts_at}
          />
          <ViewData
            icon={'calendar-alt'}
            label={t('recurring_invoices.next_invoice_at')}
            values={next_invoice_at}
          />
          {/* <ViewData
            icon={'pause-circle'}
            label={t('recurring_invoices.limit_by')}
            values={limit_by}
          />
          <ViewData
            icon={'calendar-alt'}
            label={t('recurring_invoices.limit_types.date')}
            values={limit_date}
          />
          <ViewData
            icon={'check-square'}
            label={t('recurring_invoices.limit_types.count')}
            values={limit_count}
          /> */}
          <ViewData
            inPairs
            first={{
              icon: 'pause-circle',
              label: t('recurring_invoices.limit_by'),
              values: limit_by
            }}
            second={{
              icon: 'calendar-alt',
              label: t('recurring_invoices.limit_types.date'),
              values: limit_date
            }}
          />
          <ViewData
            inPairs
            first={{
              icon: 'tag',
              label: t('recurring_invoices.status.title'),
              values: status
            }}
            second={{
              icon: 'sync',
              label: t('recurring_invoices.display_frequency'),
              values: frequency
            }}
          />
          {/* <ViewData
            icon={'sync'}
            label={t('recurring_invoices.display_frequency')}
            values={frequency}
          /> */}
          {/* <ViewData
            icon={'money'}
            label={t('invoices.totalAmount')}
            values={finalAmount()}
          /> */}
          <View>
            <View
              style={{
                flex: 0.1,
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Text style={{fontSize: 20}}>Invoices</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={formatItems(invoices, theme) ?? []}
                renderItem={this.invoiceList}
                // onPress={item => console.log(item)}
                // isEmpty={isEmpty}
                // bottomDivider
                // emptyContentProps={getEmptyContentProps()}
                // route={route}
                // isAnimated
              />
            </ScrollView>
          </View>
        </View>
      </DefaultLayout>
    );
  }
}
