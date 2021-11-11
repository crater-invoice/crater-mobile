import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const formattedItems = items =>
  items.map(item => {
    const {name, description, price, title, currency} = item;
    return {
      title: title ?? name ?? '',
      subtitle: {title: description},
      amount: price,
      currency,
      fullItem: item
    };
  });

export const itemsSelector = createSelector(
  state => state?.item?.items,
  items => (!isEmpty(items) ? formattedItems(items) : [])
);

export const loadingSelector = createSelector(
  state => state?.item,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
