import {createSelector} from 'reselect';
import {groupBy} from 'lodash';
import {isEmpty} from '@/constants';

const roleStore = state => state?.role;

export const rolesSelector = createSelector(
  roleStore,
  store => {
    if (isEmpty(store?.roles)) return [];
    return store?.roles.map(role => ({title: role.name, fullItem: role}));
  }
);

export const permissionsSelector = state => roleStore(state)?.permissions;

export const formattedPermissionsSelector = state =>
  groupBy(roleStore(state)?.permissions ?? [], 'modelName');

export const loadingSelector = createSelector(
  roleStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
