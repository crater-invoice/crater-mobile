import {
  LOGIN_SUCCESS,
  SAVE_ID_TOKEN,
  AUTH_TRIGGER_SPINNER,
  SET_BOOTSTRAP,
  RESET_ID_TOKEN,
  RESET_AUTH_LOADERS,
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
  },
  loading: {
    loginLoading: false,
    socialLoginLoading: false,
    forgetPasswordLoading: false,
    pingEndpointLoading: false
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
    case AUTH_TRIGGER_SPINNER:
      return {...state, loading: {...payload}};
    case SET_BOOTSTRAP:
      return {...state, bootstrap: {...payload}};
    case RESET_AUTH_LOADERS:
      return {
        ...state,
        loading: {
          loginLoading: false,
          socialLoginLoading: false,
          forgetPasswordLoading: false,
          pingEndpointLoading: false
        }
      };
    default:
      return state;
  }
}
