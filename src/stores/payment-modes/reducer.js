import {isEmpty} from '@/constants';
import * as types from './types';

const initialState = {
  modes: [],
  isSaving: false,
  isDeleting: false
};

export default function paymentModesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_PAYMENT_MODES_SUCCESS:
      if (payload.fresh) {
        return {...state, modes: payload.modes};
      }

      return {...state, modes: [...state.modes, ...payload.modes]};

    case types.ADD_PAYMENT_MODE_SUCCESS:
      return {
        ...state,
        modes: [payload, ...state.modes]
      };

    case types.UPDATE_PAYMENT_MODE_SUCCESS:
      const modeData = payload;
      const modeList = [];

      if (isEmpty(state.modes)) {
        return state;
      }

      state.modes.map(mode => {
        const {id} = mode;
        let value = mode;

        if (id === modeData.id) {
          value = modeData;
        }
        modeList.push(value);
      });

      return {...state, modes: modeList};

    case types.REMOVE_PAYMENT_MODE_SUCCESS:
      return {
        ...state,
        modes: state.modes.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
