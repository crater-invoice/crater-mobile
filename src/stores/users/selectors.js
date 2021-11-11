import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const usersStore = state => state?.users;
const roleStore = state => state?.role;

export const usersSelector = createSelector(
  usersStore,
  store => {
    if (isEmpty(store.users)) return [];
    return store.users.map(user => ({
      title: user?.name,
      subtitle: {title: user?.email || ''},
      fullItem: user,
      leftAvatar: user?.name.toUpperCase().charAt(0)
    }));
  }
);

export const rolesSelector = createSelector(
  roleStore,
  store => store?.roles
);

export const loadingSelector = createSelector(
  usersStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
