import {find} from 'lodash';
import * as types from './types';
import {getModalName} from './helpers';
import {hasValue, isArray, isEmpty} from '@/constants';

const initialState = {
  roles: [],
  permissions: [],
  isSaving: false,
  isDeleting: false
};

export default function roleReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_ROLES_SUCCESS:
      const roleList = payload.roles.map(role => ({
        ...role,
        fullItem: role
      }));

      if (payload.fresh) {
        return {...state, roles: roleList, isSaving: false, isDeleting: false};
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
      const isAllowed = name => {
        return hasValue(find(payload.currentPermissions, {name}));
      };

      const filteredCreatedPermissions = [];
      let dependList = [];

      for (const p of payload.permissions) {
        const allowed = isAllowed(p.ability);
        filteredCreatedPermissions.push({
          ...p,
          disabled: false,
          allowed,
          modelName: p?.model ? getModalName(p.model) : 'Common'
        });
        p?.depends_on &&
          allowed &&
          (dependList = [...dependList, ...p.depends_on]);
      }

      filteredCreatedPermissions.map((p, i) => {
        if (!p.allowed) {
          return;
        }

        const found = dependList.find(d => d === p.ability);

        if (found) {
          filteredCreatedPermissions[i] = {...p, disabled: true};
        }
      });

      return {...state, permissions: filteredCreatedPermissions};

    case types.UPDATE_PERMISSION:
      const {allowed, ability} = payload;
      let filteredPermissions = state.permissions;
      let pos = filteredPermissions.findIndex(p => p.name === ability.name);

      filteredPermissions[pos] = {...ability, allowed};

      const shouldDisableDependsOnAbility = _dependAbility => {
        let disabled = allowed;

        const currentPermissions = filteredPermissions.filter(
          p => p.allowed && p?.depends_on && p.ability !== ability.ability
        );

        let dependList = [];

        if (!isEmpty(currentPermissions)) {
          for (const c of currentPermissions) {
            dependList = [...dependList, ...c.depends_on];
          }

          const found = dependList.find(d => d === _dependAbility);
          found && (disabled = true);
        }

        return disabled;
      };

      if (!isEmpty(ability?.depends_on)) {
        for (const _dependAbility of ability?.depends_on) {
          let disabled = shouldDisableDependsOnAbility(_dependAbility);
          let pos = filteredPermissions.findIndex(
            p => p.ability === _dependAbility
          );

          filteredPermissions[pos] = {
            ...filteredPermissions[pos],
            allowed: true,
            disabled
          };
        }
      }

      return {
        ...state,
        permissions: filteredPermissions
      };

    case types.SELECT_ALL_PERMISSIONS:
      dependList = [];
      for (const p of state.permissions) {
        p?.depends_on && (dependList = [...dependList, ...p.depends_on]);
      }

      let filteredAllPermissions = state.permissions.map(p => {
        const found = dependList.find(d => d === p.ability);
        return {
          ...p,
          allowed: true,
          disabled: found ? true : false
        };
      });
      return {
        ...state,
        permissions: filteredAllPermissions
      };

    case types.RESET_PERMISSIONS:
      return {
        ...state,
        permissions: state.permissions.map(p => ({
          ...p,
          allowed: false,
          disabled: false
        }))
      };

    case types.ADD_ROLE_SUCCESS:
      return {
        ...state,
        roles: [...[payload], ...state.roles]
      };

    case types.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.map(role =>
          role.id === payload.id ? payload : role
        )
      };

    case types.REMOVE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
