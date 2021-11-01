import t from 'locales/use-translation';
import {AssetImage} from '@/components';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export default expenseFilterFields = ({props, setFormField}) => {
  const {
    categories,
    fetchCategories,
    navigation,
    getCustomers,
    customers
  } = props;

  const selectFields = [
    PermissionService.isAllowToView(routes.MAIN_CUSTOMERS) && {
      name: 'customer_id',
      apiSearch: true,
      hasPagination: true,
      getItems: getCustomers,
      items: customers,
      displayName: 'name',
      label: t('payments.customer'),
      icon: 'user',
      placeholder: t('customers.placeholder'),
      navigation: navigation,
      compareField: 'id',
      onSelect: item => setFormField('customer_id', item.id),
      headerProps: {
        title: t('customers.title'),
        rightIconPress: null
      },
      emptyContentProps: {
        contentType: 'customers',
        image: AssetImage.images.empty_customers
      }
    },
    {
      name: 'expense_category_id',
      apiSearch: true,
      hasPagination: true,
      getItems: fetchCategories,
      items: categories,
      displayName: 'name',
      label: t('expenses.category'),
      icon: 'align-center',
      placeholder: t('expenses.categoryPlaceholder'),
      navigation: navigation,
      compareField: 'id',
      onSelect: item => setFormField('expense_category_id', item.id),
      headerProps: {
        title: t('expenses.categoryPlaceholder'),
        rightIconPress: null
      },
      emptyContentProps: {
        contentType: 'categories'
      }
    }
  ];

  const datePickerFields = [
    {
      name: 'from_date',
      label: t('expenses.fromDate'),
      onChangeCallback: (formDate, displayDate) => {
        (selectedFromDate = displayDate), (selectedFromDateValue = formDate);
      },
      selectedDate: selectedFromDate,
      selectedDateValue: selectedFromDateValue
    },
    {
      name: 'to_date',
      label: t('expenses.toDate'),
      onChangeCallback: (formDate, displayDate) => {
        (selectedToDate = displayDate), (selectedToDateValue = formDate);
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
