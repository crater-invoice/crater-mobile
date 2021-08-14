import { IMAGES } from '@/assets';
import Lng from '@/lang/i18n';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export default expenseFilterFields = ({ props, setFormField }) => {
    const {
        locale,
        categories,
        getCategories,
        navigation,
        getCustomers,
        customers
    } = props;

    const selectFields = [
        {
            name: 'customer_id',
            apiSearch: true,
            hasPagination: true,
            getItems: getCustomers,
            items: customers,
            displayName: 'name',
            label: Lng.t('payments.customer', { locale }),
            icon: 'user',
            placeholder: Lng.t('customers.placeholder', { locale }),
            navigation: navigation,
            compareField: 'id',
            onSelect: item => setFormField('customer_id', item.id),
            headerProps: {
                title: Lng.t('customers.title', { locale }),
                rightIconPress: null
            },
            emptyContentProps: {
                contentType: 'customers',
                image: IMAGES.EMPTY_CUSTOMERS
            }
        },
        {
            name: 'expense_category_id',
            apiSearch: true,
            hasPagination: true,
            getItems: getCategories,
            items: categories,
            displayName: 'name',
            label: Lng.t('expenses.category', { locale }),
            icon: 'align-center',
            placeholder: Lng.t('expenses.categoryPlaceholder', { locale }),
            navigation: navigation,
            compareField: 'id',
            onSelect: item => setFormField('expense_category_id', item.id),
            headerProps: {
                title: Lng.t('expenses.categoryPlaceholder', { locale }),
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
            label: Lng.t('expenses.fromDate', { locale }),
            onChangeCallback: (formDate, displayDate) => {
                (selectedFromDate = displayDate),
                    (selectedFromDateValue = formDate);
            },
            selectedDate: selectedFromDate,
            selectedDateValue: selectedFromDateValue
        },
        {
            name: 'to_date',
            label: Lng.t('expenses.toDate', { locale }),
            onChangeCallback: (formDate, displayDate) => {
                (selectedToDate = displayDate),
                    (selectedToDateValue = formDate);
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
