import * as types from './constants';
import {find} from 'lodash';
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
        modelName: p?.model
          ? p.model.substring(p.model.lastIndexOf('\\') + 1)
          : 'Common'
      }));
      return {...state, permissions};

    case types.FETCH_SINGLE_ROLE_SUCCESS:
      console.log({payload});
      const currentPermissions = payload.currentPermissions.map(p => {
        let name = p.name;
        // p?.entity_type &&
        //   (name += ` ${p.entity_type.substring(
        //     p.model.lastIndexOf("\") + 1
        //   )}`);

        return {name: name.toLowerCase()};
      });

      const isAllowed = name => {
        return hasValue(find(currentPermissions, {name}));
      };

      const filteredCreatedPermissions = payload.permissions.map(p => ({
        ...p,
        allowed: isAllowed(p?.model ? p.name : p.ability),
        disabled: false,
        modelName: p?.model
          ? p.model.substring(p.model.lastIndexOf('\\') + 1)
          : 'Common'
      }));

      return {...state, permissions: filteredCreatedPermissions};

    case types.UPDATE_PERMISSION:
      const {allowed, ability} = payload;
      const {name} = ability;
      let filteredPermissions = state.permissions;
      const pos = filteredPermissions.findIndex(p => p.name === ability.name);

      filteredPermissions[pos] = {...ability, allowed};

      if (name.includes('delete') || name.includes('edit')) {
        const abilityName = name.split(' ')[1];

        const isAllowToEdit = find(filteredPermissions, {
          name: `edit ${abilityName}`
        })?.allowed;

        const isAllowToDelete = find(filteredPermissions, {
          name: `delete ${abilityName}`
        })?.allowed;

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
      const roles = [];
      state.roles.map(company => {
        let value = company;
        company.id === payload.id && (value = payload);
        roles.push(value);
      });

      return {...state, roles};

    case types.REMOVE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
