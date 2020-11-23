import Lng from '@/lang/i18n';
import { IMAGES } from '@/assets';

export default paymentsFilterFields = ({ props, setFormField }) => {
    const {
        getCustomers,
        getPaymentModes,
        customers,
        locale,
        navigation,
        paymentMethods
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
            name: 'payment_method_id',
            apiSearch: true,
            hasPagination: true,
            getItems: getPaymentModes,
            items: paymentMethods,
            displayName: 'name',
            label: Lng.t('payments.mode', { locale }),
            icon: 'align-center',
            placeholder: Lng.t('payments.modePlaceholder', { locale }),
            navigation: navigation,
            compareField: 'id',
            onSelect: item => setFormField('payment_method_id', item.id),
            headerProps: {
                title: Lng.t('payments.modePlaceholder', { locale }),
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
            hint: Lng.t('payments.number', { locale }),
            leftIcon: 'hashtag',
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true
            }
        }
    ];

    return { selectFields, inputFields };
};
