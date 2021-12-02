import * as types from './types.js';

const initialState = {
  emailConfig: null
};

export default function settingReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.FETCH_MAIL_CONFIG_SUCCESS:
      return {...state, emailConfig: payload};

    default:
      return state;
  }
}
