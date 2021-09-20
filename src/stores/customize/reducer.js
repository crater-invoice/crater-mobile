import * as types from './types';

const initialState = {
  loading: {
    customizeLoading: false
  },
  customizes: null
};

export default function customizeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, loading: {...payload}};

    default:
      return state;
  }
}
