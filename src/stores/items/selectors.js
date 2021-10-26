import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const formattedUsers = users =>
  users.map(user => ({
    title: user?.name,
    fullItem: user,
    subtitle: {title: user?.email || ''},
    leftAvatar: user?.name.toUpperCase().charAt(0)
  }));

export const usersSelector = createSelector(
  state => state?.users?.users,
  users => (!isEmpty(users) ? formattedUsers(users) : [])
);

export const rolesSelector = createSelector(
  state => state?.roles?.roles,
  roles => roles
);

export const loadingSelector = createSelector(
  state => state?.users,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
