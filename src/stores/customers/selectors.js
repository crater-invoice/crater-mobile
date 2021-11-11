import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const customersStore = state => state?.customers;

export const customersSelector = createSelector(
  customersStore,
  store => {
    if (isEmpty(store?.customers)) return [];
    return store.customers.map(customer => ({
      title: customer?.name,
      subtitle: {title: customer?.contact_name || ''},
      leftAvatar: customer?.name.toUpperCase().charAt(0),
      fullItem: customer
    }));
  }
);

export const loadingSelector = createSelector(
  customersStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
