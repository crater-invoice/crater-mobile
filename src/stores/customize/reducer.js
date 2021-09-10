import * as types from './types';

const initialState = {
  loading: {
    getCustomizeLoading: false,
    customizeLoading: false
  },
  customizes: null
};

export default function customizeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, loading: {...payload}};

    case types.SET_CUSTOMIZE_SETTINGS:
      const {customizes} = payload;

      return {...state, customizes};
    default:
      return state;
  }
}
