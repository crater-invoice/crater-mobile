import t from 'locales/use-translation';
import {IMAGES} from '@/assets';
import {
  FILTER_INVOICE_STATUS,
  FILTER_INVOICE_PAID_STATUS
} from '../../constants';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export const invoicesFilterFields = ({props, setFormField}) => {
  const filterRefs = {};

  const {getCustomers, customers, navigation} = props;

  const dropdownStyle = {
    marginTop: 12,
    marginBottom: 2
  };

  const selectFields = [
    {
      name: 'customer_id',
      apiSearch: true,
      hasPagination: true,
      getItems: getCustomers,
      items: customers,
      displayName: 'name',
      label: t('invoices.customer'),
      icon: 'user',
      placeholder: t('customers.placeholder'),
      navigation: navigation,
      compareField: 'id',
      onSelect: item => setFormField('customer_id', item.id),
      headerProps: {
        title: t('customers.title'),
        rightIconPress: null
      },
      listViewProps: {hasAvatar: true},
      emptyContentProps: {
        contentType: 'customers',
        image: IMAGES.EMPTY_CUSTOMERS
      }
    }
  ];

  const datePickerFields = [
    {
      name: 'from_date',
      label: t('invoices.fromDate'),
      onChangeCallback: (formDate, displayDate) => {
        selectedFromDate = displayDate;
        selectedFromDateValue = formDate;
      },
      selectedDate: selectedFromDate,
      selectedDateValue: selectedFromDateValue
    },
    {
      name: 'to_date',
      label: t('invoices.toDate'),
      onChangeCallback: (formDate, displayDate) => {
        selectedToDate = displayDate;
        selectedToDateValue = formDate;
      },
      selectedDate: selectedToDate,
      selectedDateValue: selectedToDateValue
    }
  ];

  const inputFields = [
    {
      name: 'invoice_number',
      hint: t('invoices.invoiceNumber'),
      leftIcon: 'hashtag',
      refLinkFn: ref => (filterRefs.invNumber = ref)
    }
  ];

  const dropdownFields = [
    {
      name: 'filterStatus',
      label: t('invoices.status'),
      fieldIcon: 'align-center',
      items: [...FILTER_INVOICE_STATUS, ...FILTER_INVOICE_PAID_STATUS],
      onChangeCallback: val => setFormField('filterStatus', val),
      defaultPickerOptions: {
        label: t('invoices.statusPlaceholder'),
        value: ''
      },
      containerStyle: dropdownStyle
    }
  ];

  return {
    selectFields,
    datePickerFields,
    inputFields,
    dropdownFields
  };
};
