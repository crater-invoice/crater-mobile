import * as types from './types';
import {isEmpty} from '@/constants';

const initialState = {
  items: [],
  isSaving: false,
  isDeleting: false
};

export default function itemReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_ITEMS_SUCCESS:
      if (payload.fresh) {
        return {...state, items: payload.items};
      }

      return {...state, items: [...state.items, ...payload.items]};

    case types.ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: [...[payload], ...state.items]
      };

    case types.UPDATE_ITEM_SUCCESS:
      const itemData = payload;
      const itemList = [];

      if (isEmpty(state.items)) {
        return state;
      }

      state.items.map(item => {
        const {id} = item;
        let value = item;

        if (id === itemData.id) {
          value = itemData;
        }
        itemList.push(value);
      });

      return {...state, items: itemList};

    case types.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
