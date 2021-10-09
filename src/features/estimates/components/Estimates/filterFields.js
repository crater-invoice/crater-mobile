import t from 'locales/use-translation';
import {IMAGES} from '@/assets';
import {FILTER_ESTIMATE_STATUS} from '../../constants';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export default estimateFilterFields = ({props, setFormField}) => {
  const {getCustomers, customers, navigation} = props;

  const selectFields = [
    {
      name: 'customer_id',
      apiSearch: true,
      hasPagination: true,
      getItems: getCustomers,
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
        image: IMAGES.EMPTY_CUSTOMERS
      }
    }
  ];

  const datePickerFields = [
    {
      name: 'from_date',
      label: t('estimates.fromDate'),
      onChangeCallback: (formDate, displayDate) => {
        (selectedFromDate = displayDate), (selectedFromDateValue = formDate);
      },
      selectedDate: selectedFromDate,
      selectedDateValue: selectedFromDateValue
    },
    {
      name: 'to_date',
      label: t('estimates.toDate'),
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
      hint: t('estimates.estimateNumber')
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
        label: t('estimates.statusPlaceholder'),
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
