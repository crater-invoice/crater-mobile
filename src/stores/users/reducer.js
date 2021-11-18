import * as types from './types';

const initialState = {
  users: [],
  isSaving: false,
  isDeleting: false
};

export default function usersReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_USERS_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          users: payload.users,
          isSaving: false,
          isDeleting: false
        };
      }
      return {...state, users: [...state.users, ...payload.users]};

    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...[payload], ...state.users]
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === payload.id ? payload : user
        )
      };

    case types.REMOVE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
