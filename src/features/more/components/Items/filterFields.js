import t from 'locales/use-translation';
import {keyboardType} from '@/constants';
import styles from './styles';

export const itemsFilterFields = ({props, setFormField}) => {
  const {units, fetchItemUnits, navigation} = props;
  const filterRefs: any = {};

  const inputFields = [
    {
      name: 'name',
      hint: t('items.name'),
      refLinkFn: ref => (filterRefs.name = ref),
      onSubmitEditing: () => filterRefs.price.focus()
    },
    {
      name: 'price',
      hint: t('items.price'),
      isCurrencyInput: true,
      refLinkFn: ref => (filterRefs.price = ref),
      keyboardType: keyboardType.DECIMAL
    }
  ];

  const selectFields = [
    {
      name: 'unit_id',
      apiSearch: true,
      hasPagination: true,
      getItems: fetchItemUnits,
      items: units,
      displayName: 'name',
      label: t('items.unit'),
      icon: 'balance-scale',
      placeholder: t('items.unitPlaceholder'),
      navigation: navigation,
      compareField: 'id',
      onSelect: item => setFormField('unit_id', item.id),
      headerProps: {
        title: t('items.unitPlaceholder'),
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

  return {inputFields, selectFields};
};

export default itemsFilterFields;
