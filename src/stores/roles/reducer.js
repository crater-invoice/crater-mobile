import {find} from 'lodash';
import * as types from './types';
import {getModalName} from './helpers';
import {hasValue} from '@/constants';

const initialState = {
  roles: [],
  permissions: [],
  loading: {}
};

export default function rolesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {
        ...state,
        loading: {...state.loading, ...payload}
      };

    case types.FETCH_ROLES_SUCCESS:
      const roleList = payload.roles.map(role => ({
        ...role,
        fullItem: role
      }));

      if (payload.fresh) {
        return {...state, roles: roleList};
      }

      return {...state, roles: [...state.roles, ...roleList]};

    case types.FETCH_PERMISSIONS_SUCCESS:
      const permissions = payload.map(p => ({
        ...p,
        allowed: false,
        disabled: false,
        modelName: p?.model ? getModalName(p.model) : 'Common'
      }));
      return {...state, permissions};

    case types.FETCH_SINGLE_ROLE_SUCCESS:
      const isAllowed = (entity_type, name) => {
        return hasValue(find(payload.currentPermissions, {entity_type, name}));
      };
      const filteredCreatedPermissions = payload.permissions.map(p => ({
        ...p,
        disabled: false,
        allowed: isAllowed(p?.model, p.ability),
        modelName: p?.model ? getModalName(p.model) : 'Common'
      }));

      const checkViewAvailability = (model, ability) => {
        return filteredCreatedPermissions.some(
          p =>
            p.model === model &&
            p.ability.includes(ability) &&
            p.allowed === true
        );
      };

      filteredCreatedPermissions.map(p => {
        const {ability, model} = p;

        if (ability.includes('edit') || ability.includes('delete')) {
          const isAllowToEdit = checkViewAvailability(model, `edit`);
          const isAllowToDelete = checkViewAvailability(model, `delete`);
          const disabled = isAllowToEdit || isAllowToDelete;
          const viewAbility = filteredCreatedPermissions.filter(
            p => p.model === model && p.ability.includes('view')
          )?.[0];

          if (!viewAbility) {
            return;
          }

          let pos = filteredCreatedPermissions.findIndex(
            p => p.name === viewAbility.name
          );
          filteredCreatedPermissions[pos] = {
            ...viewAbility,
            disabled
          };
        }
      });
      return {...state, permissions: filteredCreatedPermissions};

    case types.UPDATE_PERMISSION:
      const {allowed, ability} = payload;
      const {model} = ability;
      let filteredPermissions = state.permissions;
      let pos = filteredPermissions.findIndex(p => p.name === ability.name);

      filteredPermissions[pos] = {...ability, allowed};

      const checkAvailability = ability => {
        return filteredPermissions.some(
          p =>
            p.model === model &&
            p.ability.includes(ability) &&
            p.allowed === true
        );
      };

      if (
        ability.ability.includes('edit') ||
        ability.ability.includes('delete')
      ) {
        const isAllowToEdit = checkAvailability(`edit`);
        const isAllowToDelete = checkAvailability(`delete`);
        const disabled = isAllowToEdit || isAllowToDelete;

        filteredPermissions = filteredPermissions.map(p =>
          p.model === model && p.ability.includes(`view`)
            ? {...p, allowed: true, disabled}
            : p
        );
      }

      return {
        ...state,
        permissions: filteredPermissions
      };

    case types.ADD_ROLE_SUCCESS:
      return {
        ...state,
        roles: [...state.roles, ...[payload]]
      };

    case types.UPDATE_ROLE_SUCCESS:
      const filteredUpdatedRoles = state.roles;
      pos = filteredUpdatedRoles.findIndex(role => role.id === payload.id);
      filteredUpdatedRoles[pos] = payload;
      return {...state, roles: filteredUpdatedRoles};

    case types.REMOVE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
