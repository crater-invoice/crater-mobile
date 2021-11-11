import t from 'locales/use-translation';
import {
  FILTER_INVOICE_STATUS,
  FILTER_INVOICE_PAID_STATUS
} from 'stores/invoice/types';
import {AssetImage} from '@/components';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export const invoicesFilterFields = ({props, setFormField}) => {
  const filterRefs = {};

  const {fetchCustomers, customers, navigation} = props;

  const selectFields = [
    PermissionService.isAllowToView(routes.MAIN_CUSTOMERS) && {
      name: 'customer_id',
      apiSearch: true,
      hasPagination: true,
      getItems: fetchCustomers,
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
    }
  ];

  const datePickerFields = [
    {
      name: 'from_date',
      label: t('invoices.from_date'),
      onChangeCallback: (formDate, displayDate) => {
        selectedFromDate = displayDate;
        selectedFromDateValue = formDate;
      },
      selectedDate: selectedFromDate,
      selectedDateValue: selectedFromDateValue
    },
    {
      name: 'to_date',
      label: t('invoices.to_date'),
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
      hint: t('invoices.invoice_number'),
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
        label: t('invoices.status_placeholder'),
        value: ''
      }
    }
  ];

  return {
    selectFields,
    datePickerFields,
    inputFields,
    dropdownFields
  };
};
