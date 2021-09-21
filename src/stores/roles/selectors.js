import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const formattedRoles = roles =>
  roles.map(role => ({
    title: role.name,
    fullItem: role
  }));

export const rolesSelector = createSelector(
  roles => roles,
  roles => (!isEmpty(roles) ? formattedRoles(roles) : [])
);
