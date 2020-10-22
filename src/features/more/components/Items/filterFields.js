import Lng from '@/lang/i18n';
import { formatSelectPickerName } from '@/utils';
import styles from './styles';

export const itemsFilterFields = ({ props, state, setFormField }) => {
    const { locale, units } = props;
    const { selectedUnit } = state;
    const filterRefs: any = {};

    const inputFields = [
        {
            name: 'name',
            hint: Lng.t('items.name', { locale }),
            refLinkFn: ref => (filterRefs.name = ref),
            inputProps: {
                returnKeyType: 'next',
                autoCorrect: true,
                autoFocus: true,
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
                keyboardType: 'numeric'
            }
        }
    ];

    const dropdownFields = [
        {
            name: 'unit_id',
            label: Lng.t('items.unit', { locale }),
            fieldIcon: 'align-center',
            items: formatSelectPickerName(units),
            onChangeCallback: val => setFormField('unit_id', val),
            defaultPickerOptions: {
                label: Lng.t('items.unitPlaceholder', { locale }),
                value: ''
            },
            selectedItem: selectedUnit,
            onDonePress: () => filterRefs.name.focus(),
            containerStyle: styles.selectPicker
        }
    ];

    return {
        inputFields,
        dropdownFields
    };
};

export default itemsFilterFields;
