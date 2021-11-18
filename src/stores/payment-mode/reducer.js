import * as types from './types';

const initialState = {
  modes: [],
  isSaving: false,
  isDeleting: false
};

export default function paymentModeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_PAYMENT_MODES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          modes: payload.modes,
          isSaving: false,
          isDeleting: false
        };
      }
      return {...state, modes: [...state.modes, ...payload.modes]};

    case types.ADD_PAYMENT_MODE_SUCCESS:
      return {...state, modes: [payload, ...state.modes]};

    case types.UPDATE_PAYMENT_MODE_SUCCESS:
      return {
        ...state,
        modes: state.modes.map(mode =>
          mode.id === payload.id ? payload : mode
        )
      };

    case types.REMOVE_PAYMENT_MODE_SUCCESS:
      return {
        ...state,
        modes: state.modes.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
