import * as types from './types';

const initialState = {
  taxation_type: null,
  isSaving: false
};

export default function taxTypeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_TAXATION_SUCCESS:
      return {...state, taxation_type: payload.taxation_type};

    case types.UPDATE_TAXATION_SUCCESS:
      return {...state, taxation_type: payload.taxation_type};

    default:
      return state;
  }
}
