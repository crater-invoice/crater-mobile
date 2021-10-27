import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const categoriesStore = state => state?.categories;

export const categoriesSelector = createSelector(
  categoriesStore,
  store => {
    if (isEmpty(store?.categories)) return [];
    return store.categories.map(category => ({
      title: category.name,
      subtitle: {title: category.description},
      fullItem: category
    }));
  }
);

export const loadingSelector = createSelector(
  categoriesStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
