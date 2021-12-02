import t from 'locales/use-translation';
import {AssetImage} from '@/components';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export const recurringInvoicesFilterFields = ({props, setFormField}) => {
  const {
    fetchCustomers,
    customers,
    navigation,
    statusList = [],
    formValues: {filterStatus}
  } = props;

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
  const dropdownFields = [
    {
      name: 'filterStatus',
      label: t('recurring_invoices.status.title'),
      items: statusList,
      fieldIcon: 'tag',
      onChangeCallback: item => setFormField('filterStatus', item),
      defaultPickerOptions: {
        label: t('recurring_invoices.status.placeholder'),
        value: ''
      }
    }
  ];
  return {
    selectFields,
    dropdownFields,
    datePickerFields
  };
};
