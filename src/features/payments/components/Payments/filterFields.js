import t from 'locales/use-translation';
import { IMAGES } from '@/assets';

export default paymentsFilterFields = ({ props, setFormField }) => {
    const {
        getCustomers,
        getPaymentModes,
        customers,
        navigation,
        paymentModes
    } = props;

    const selectFields = [
        {
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
                image: IMAGES.EMPTY_CUSTOMERS
            }
        },
        {
            name: 'payment_method_id',
            apiSearch: true,
            hasPagination: true,
            getItems: getPaymentModes,
            items: paymentModes,
            displayName: 'name',
            label: t('payments.mode'),
            icon: 'align-center',
            placeholder: t('payments.modePlaceholder'),
            navigation: navigation,
            compareField: 'id',
            onSelect: item => setFormField('payment_method_id', item.id),
            headerProps: {
                title: t('payments.modePlaceholder'),
                rightIconPress: null
            },
            listViewProps: { hasAvatar: true },
            emptyContentProps: {
                contentType: 'paymentMode'
            }
        }
    ];

    const inputFields = [
        {
            name: 'payment_number',
            hint: t('payments.number'),
            leftIcon: 'hashtag',
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true
            }
        }
    ];

    return { selectFields, inputFields };
};
