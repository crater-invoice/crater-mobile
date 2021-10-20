import t from 'locales/use-translation';
import {AssetImage} from '@/components';
import {statusSelector} from '@/stores/recurring-invoices/selectors';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export const recurringInvoicesFilterFields = ({props, setFormField}) => {
  const filterRefs = {};
  const {
    getCustomers,
    customers,
    navigation,
    statusList = [],
    formValues: {status}
  } = props;
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
        image: AssetImage.images.empty_customers
      }
    },
    {
      name: 'filterStatus',
      label: t('recurring_invoices.status.title'),
      icon: 'tag',
      fieldIcon: 'align-center',
      items: statusSelector(statusList),
      headerProps: {title: t('recurring_invoices.status.title')},
      emptyContentProps: {
        contentType: 'recurring_invoices.status'
      },
      placeholder: status ?? t('recurring_invoices.status.title'),
      isInternalSearch: true,
      onSelect: val => {
        setFormField('filterStatus', val);
      },
      containerStyle: dropdownStyle
    }
  ];

  const datePickerFields = [
    {
      name: 'from_date',
      label: t('recurring_invoices.from_start_at_date'),
      onChangeCallback: (formDate, displayDate) => {
        selectedFromDate = displayDate;
        selectedFromDateValue = formDate;
      },
      selectedDate: selectedFromDate,
      selectedDateValue: selectedFromDateValue
    },
    {
      name: 'to_date',
      label: t('recurring_invoices.to_start_at_date'),
      onChangeCallback: (formDate, displayDate) => {
        selectedToDate = displayDate;
        selectedToDateValue = formDate;
      },
      selectedDate: selectedToDate,
      selectedDateValue: selectedToDateValue
    }
  ];

  return {
    selectFields,
    datePickerFields
  };
};
