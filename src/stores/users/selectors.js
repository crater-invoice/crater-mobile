import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const usersStore = state => state?.users;
const rolesStore = state => state?.roles;

export const usersSelector = createSelector(
  usersStore,
  users => {
    if (isEmpty(users.users)) return [];
    return users.users.map(user => ({
      title: user?.name,
      subtitle: {title: user?.email || ''},
      fullItem: user,
      leftAvatar: user?.name.toUpperCase().charAt(0)
    }));
  }
);

export const rolesSelector = createSelector(
  rolesStore,
  roles => roles?.roles
);

export const loadingSelector = createSelector(
  usersStore,
  user => ({isSaving: user?.isSaving, isDeleting: user?.isDeleting})
);
