import * as types from './types';
import {isEmpty} from '@/constants';

const initialState = {
  loading: {
    // payment method
    paymentModesLoading: false,
    paymentModeLoading: false
  }
};

export default function paymentModesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {
        ...state,
        loading: {...state.loading, ...payload}
      };

    case types.FETCH_USERS_SUCCESS:
      if (payload.fresh) {
        return {...state, users: payload.users};
      }

      return {...state, users: [...state.users, ...payload.users]};

    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...[payload], ...state.users]
      };

    case types.UPDATE_USER_SUCCESS:
      const userData = payload;
      const userList = [];

      if (isEmpty(state.users)) {
        return state;
      }

      state.users.map(user => {
        const {id} = user;
        let value = user;

        if (id === userData.id) {
          value = userData;
        }
        userList.push(value);
      });

      return {...state, users: userList};

    case types.REMOVE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
