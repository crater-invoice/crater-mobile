import {createSelector} from 'reselect';
import {groupBy} from 'lodash';
import {isEmpty} from '@/constants';

const rolesStore = state => state?.roles;

export const rolesSelector = createSelector(
  rolesStore,
  store => {
    if (isEmpty(store?.roles)) return [];
    return store?.roles.map(role => ({title: role.name, fullItem: role}));
  }
);

export const permissionsSelector = state => rolesStore(state)?.permissions;

export const formattedPermissionsSelector = state =>
  groupBy(rolesStore(state)?.permissions ?? [], 'modelName');

export const loadingSelector = createSelector(
  rolesStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
