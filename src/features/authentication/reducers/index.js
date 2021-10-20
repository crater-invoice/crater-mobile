import {
  LOGIN_SUCCESS,
  SAVE_ID_TOKEN,
  SET_BOOTSTRAP,
  RESET_ID_TOKEN,
  LOGOUT_SUCCESS,
  PING_SUCCESS
} from '../constants';

const initialState = {
  loginError: null,
  errors: null,
  idToken: null,
  expiresIn: null,
  expoToken: null,
  isLogin: false,
  bootstrap: {
    user: null,
    customers: [],
    currencies: []
  }
};

export default function authReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {...state, isLogin: true};
    case LOGOUT_SUCCESS:
      return {...state, isLogin: false};
    case PING_SUCCESS:
      return {...state, isLogin: false};
    case SAVE_ID_TOKEN:
      const {idToken, expiresIn} = payload;
      return {...state, idToken, expiresIn};
    case RESET_ID_TOKEN:
      return {...state, idToken: null, expiresIn: null};
    case SET_BOOTSTRAP:
      return {...state, bootstrap: {...payload}};
    default:
      return state;
  }
}
