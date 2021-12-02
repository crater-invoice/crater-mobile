import * as types from './types';

const initialState = {
  currentUser: null,
  currentAbilities: [],
  isSaving: false
};

export default function userReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.SET_CURRENT_USER:
      return {...state, currentUser: payload};

    case types.SET_USER_SETTING:
      return {...state, ...payload, isSaving: false};

    default:
      return state;
  }
}
