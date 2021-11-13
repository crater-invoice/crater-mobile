import {isEmpty} from '@/constants';

export const formatItems = (items, currency) => {
  if (isEmpty(items)) {
    return [];
  }
  return items.map(item => {
    const {name, description, price, title} = item;
    return {
      title: title ?? name ?? '',
      subtitle: {title: description},
      amount: price,
      currency,
      fullItem: item
    };
  });
};
