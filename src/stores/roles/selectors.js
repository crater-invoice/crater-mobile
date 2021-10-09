import {createSelector} from 'reselect';
import {groupBy} from 'lodash';
import {isEmpty} from '@/constants';

const rolesStore = state => state?.roles;

export const rolesSelector = createSelector(
  rolesStore,
  roles => {
    if (isEmpty(roles?.roles)) return [];
    return roles?.roles.map(role => ({title: role.name, fullItem: role}));
  }
);

export const permissionsSelector = state => rolesStore(state)?.permissions;

export const formattedPermissionsSelector = state =>
  groupBy(rolesStore(state)?.permissions ?? [], 'modelName');

export const loadingSelector = createSelector(
  rolesStore,
  role => ({isSaving: role?.isSaving, isDeleting: role?.isDeleting})
);
