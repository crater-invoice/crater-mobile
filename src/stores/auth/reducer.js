import * as types from './types';

const initialState = {
  idToken: null,
  isLogin: false
};

export default function authReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
      return {...state, isLogin: true};

    case types.LOGOUT_SUCCESS:
      return {...state, isLogin: false};

    case types.PING_SUCCESS:
      return {...state, isLogin: false};

    case types.SAVE_ID_TOKEN:
      return {...state, idToken: payload};

    default:
      return state;
  }
}
