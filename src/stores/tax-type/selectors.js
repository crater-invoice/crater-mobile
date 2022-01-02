import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const taxTypeStore = state => state?.taxType;

export const formatTaxType = tax => ({
  title: tax.name,
  subtitle: {title: tax.description},
  rightTitle: `${tax.percent} %`,
  fullItem: tax
});

export const taxTypesSelector = createSelector(
  taxTypeStore,
  store => {
    if (isEmpty(store?.taxTypes)) return [];
    return store.taxTypes.map(tax => formatTaxType(tax));
  }
);

export const loadingSelector = createSelector(
  taxTypeStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
