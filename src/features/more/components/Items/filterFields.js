import Lng from '@/lang/i18n';
import styles from './styles';

export const itemsFilterFields = ({ props, setFormField }) => {
    const { locale, units, getItemUnits, navigation } = props;
    const filterRefs: any = {};

    const inputFields = [
        {
            name: 'name',
            hint: Lng.t('items.name', { locale }),
            refLinkFn: ref => (filterRefs.name = ref),
            inputProps: {
                returnKeyType: 'next',
                autoCorrect: true,
                onSubmitEditing: () => filterRefs.price.focus()
            }
        },
        {
            name: 'price',
            hint: Lng.t('items.price', { locale }),
            isCurrencyInput: true,
            refLinkFn: ref => (filterRefs.price = ref),
            inputProps: {
                returnKeyType: 'next',
                keyboardType: 'decimal-pad'
            }
        }
    ];

    const selectFields = [
        {
            name: 'unit_id',
            apiSearch: true,
            hasPagination: true,
            getItems: getItemUnits,
            items: units,
            displayName: 'name',
            label: Lng.t('items.unit', { locale }),
            icon: 'balance-scale',
            placeholder: Lng.t('items.unitPlaceholder', { locale }),
            navigation: navigation,
            compareField: 'id',
            onSelect: item => setFormField('unit_id', item.id),
            headerProps: {
                title: Lng.t('items.unitPlaceholder', { locale }),
                rightIconPress: null
            },
            emptyContentProps: {
                contentType: 'units'
            },
            fakeInputProps: {
                valueStyle: styles.units,
                placeholderStyle: styles.units
            }
        }
    ];

    return { inputFields, selectFields };
};

export default itemsFilterFields;
