import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const categoryStore = state => state?.category;

export const categoriesSelector = createSelector(
  categoryStore,
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
  categoryStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
