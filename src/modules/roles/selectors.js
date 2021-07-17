import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const formattedRoles = roles =>
  roles.map(role => ({
    title: role.title,
    fullItem: role
  }));

export const rolesSelector = createSelector(
  roles => roles,
  roles => (!isEmpty(roles) ? formattedRoles(roles) : [])
);
