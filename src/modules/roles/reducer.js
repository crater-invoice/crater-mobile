import {find} from 'lodash';
import * as types from './constants';
import {getModalName} from './constants';
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
      return {...state, roles: payload};

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

      return {...state, permissions: filteredCreatedPermissions};

    case types.UPDATE_PERMISSION:
      const {allowed, ability} = payload;
      const {name} = ability;
      let filteredPermissions = state.permissions;
      let pos = filteredPermissions.findIndex(p => p.name === ability.name);

      filteredPermissions[pos] = {...ability, allowed};

      const checkAvailability = name =>
        find(filteredPermissions, {name})?.allowed;

      if (name.includes('delete') || name.includes('edit')) {
        const abilityName = name.replace(`${name.split(' ')[0]} `, '');
        const isAllowToEdit = checkAvailability(`edit ${abilityName}`);
        const isAllowToDelete = checkAvailability(`delete ${abilityName}`);
        const disabled = isAllowToEdit || isAllowToDelete;

        filteredPermissions = filteredPermissions.map(p =>
          p.name === `view ${abilityName}` ? {...p, allowed: true, disabled} : p
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
      const filterUpdatedRoles = state.roles;
      pos = filterUpdatedRoles.findIndex(role => role.id === payload.id);
      filterUpdatedRoles[pos] = payload;
      return {...state, roles: filterUpdatedRoles};

    case types.REMOVE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
