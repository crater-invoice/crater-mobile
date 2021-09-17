import * as types from './types';

const initialState = {
  loading: {
    fetchCustomizeLoading: false,
    customizeLoading: false
  },
  customizes: null
};

export default function customizeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, loading: {...payload}};

    case types.FETCH_CUSTOMIZE_SETTINGS_SUCCESS:
      return {...state, customizes: payload};
    default:
      return state;
  }
}
