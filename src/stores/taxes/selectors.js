import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const taxesStore = state => state?.taxes;

export const taxTypesSelector = createSelector(
  taxesStore,
  store => {
    if (isEmpty(store?.taxTypes)) return [];
    return store.taxTypes.map(tax => ({
      title: tax.name,
      subtitle: {title: tax.description},
      rightTitle: `${tax.percent} %`,
      fullItem: tax
    }));
  }
);

export const loadingSelector = createSelector(
  taxesStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
