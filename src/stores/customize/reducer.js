import * as types from './types';

const initialState = {
  isSaving: false
};

export default function customizeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    default:
      return state;
  }
}
