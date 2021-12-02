import * as types from './types';

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
        return {
          ...state,
          items: payload.items,
          isSaving: false,
          isDeleting: false
        };
      }
      return {...state, items: [...state.items, ...payload.items]};

    case types.ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: [...payload, ...state.items]
      };

    case types.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === payload.id ? payload : item
        )
      };

    case types.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(({id}) => id !== payload.id)
      };

    default:
      return state;
  }
}
