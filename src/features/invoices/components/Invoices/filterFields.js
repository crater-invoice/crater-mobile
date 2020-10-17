import Lng from '@/api/lang/i18n';
import { IMAGES } from '@/config';
import {
    FILTER_INVOICE_STATUS,
    FILTER_INVOICE_PAID_STATUS
} from '../../constants';

let selectedFromDate = '';
let selectedFromDateValue = '';
let selectedToDate = '';
let selectedToDateValue = '';

export const invoicesFilterFields = ({ props, setFormField }) => {
    const filterRefs = {};

    const { getCustomers, customers, locale, navigation } = props;

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
            label: Lng.t('invoices.customer', { locale }),
            icon: 'user',
            placeholder: Lng.t('customers.placeholder', { locale }),
            navigation: navigation,
            compareField: 'id',
            onSelect: item => setFormField('customer_id', item.id),
            headerProps: {
                title: Lng.t('customers.title', { locale }),
                rightIconPress: null
            },
            listViewProps: { hasAvatar: true },
            emptyContentProps: {
                contentType: 'customers',
                image: IMAGES.EMPTY_CUSTOMERS
            }
        }
    ];

    const datePickerFields = [
        {
            name: 'from_date',
            label: Lng.t('invoices.fromDate', { locale }),
            onChangeCallback: (formDate, displayDate) => {
                selectedFromDate = displayDate;
                selectedFromDateValue = formDate;
            },
            selectedDate: selectedFromDate,
            selectedDateValue: selectedFromDateValue
        },
        {
            name: 'to_date',
            label: Lng.t('invoices.toDate', { locale }),
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
            hint: Lng.t('invoices.invoiceNumber', { locale }),
            leftIcon: 'hashtag',
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true
            },
            refLinkFn: ref => (filterRefs.invNumber = ref)
        }
    ];

    const dropdownFields = [
        {
            name: 'filterStatus',
            label: Lng.t('invoices.status', { locale }),
            fieldIcon: 'align-center',
            items: FILTER_INVOICE_STATUS,
            onChangeCallback: val => setFormField('filterStatus', val),
            defaultPickerOptions: {
                label: Lng.t('invoices.statusPlaceholder', {
                    locale
                }),
                value: ''
            },
            containerStyle: dropdownStyle
        },
        {
            name: 'paid_status',
            label: Lng.t('invoices.paidStatus', { locale }),
            fieldIcon: 'align-center',
            items: FILTER_INVOICE_PAID_STATUS,
            onChangeCallback: val => setFormField('paid_status', val),
            defaultPickerOptions: {
                label: Lng.t('invoices.paidStatusPlaceholder', {
                    locale
                }),
                value: ''
            },
            onDonePress: () => filterRefs.invNumber.focus(),
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
