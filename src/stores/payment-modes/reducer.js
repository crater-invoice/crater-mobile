import * as types from './types';
import {isEmpty} from '@/constants';

const initialState = {
  loading: {
    paymentModesLoading: false,
    paymentModeLoading: false
  },
  modes: []
};

export default function paymentModesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SET_PAYMENT_MODES:
      if (!payload.fresh) {
        return {
          ...state,
          modes: [...state.modes, ...payload.modes]
        };
      }

      return {...state, modes: payload.modes};

    case types.SET_PAYMENT_MODE:
      const {paymentMethod, isCreated, isUpdated, isRemove} = payload;

      if (isCreated) {
        return {
          ...state,
          modes: [...paymentMethod, ...state.modes]
        };
      }
      if (isUpdated) {
        const methods = [];

        state.modes.map(method => {
          let value = method;
          method.id === paymentMethod.id && (value = paymentMethod);
          methods.push(value);
        });

        return {
          ...state,
          modes: methods
        };
      }
      if (isRemove) {
        const remainMethods = state.modes.filter(({id}) => id !== payload.id);

        return {...state, modes: remainMethods};
      }

      return {...state};

    default:
      return state;
  }
}
