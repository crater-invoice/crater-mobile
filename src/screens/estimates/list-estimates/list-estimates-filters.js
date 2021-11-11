import t from 'locales/use-translation';
import {FILTER_ESTIMATE_STATUS} from 'stores/estimate/types';
import {AssetImage} from '@/components';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export default estimateFilterFields = ({props, setFormField}) => {
  const {fetchCustomers, customers, navigation} = props;

  const selectFields = [
    PermissionService.isAllowToView(routes.MAIN_CUSTOMERS) && {
      name: 'customer_id',
      apiSearch: true,
      hasPagination: true,
      getItems: fetchCustomers,
      items: customers,
      displayName: 'name',
      label: t('estimates.customer'),
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
      label: t('estimates.from_date'),
      onChangeCallback: (formDate, displayDate) => {
        (selectedFromDate = displayDate), (selectedFromDateValue = formDate);
      },
      selectedDate: selectedFromDate,
      selectedDateValue: selectedFromDateValue
    },
    {
      name: 'to_date',
      label: t('estimates.to_date'),
      onChangeCallback: (formDate, displayDate) => {
        (selectedToDate = displayDate), (selectedToDateValue = formDate);
      },
      selectedDate: selectedToDate,
      selectedDateValue: selectedToDateValue
    }
  ];

  const inputFields = [
    {
      name: 'estimate_number',
      hint: t('estimates.estimate_number')
    }
  ];

  const dropdownFields = [
    {
      name: 'filterStatus',
      label: t('estimates.status'),
      fieldIcon: 'align-center',
      items: FILTER_ESTIMATE_STATUS,
      onChangeCallback: val => setFormField('filterStatus', val),
      defaultPickerOptions: {
        label: t('estimates.status_placeholder'),
        value: ''
      },
      containerStyle: {marginTop: 15}
    }
  ];

  return {
    selectFields,
    datePickerFields,
    inputFields,
    dropdownFields
  };
};
