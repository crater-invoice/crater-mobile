import * as types from './types';

const initialState = {
  categories: [],
  isSaving: false,
  isDeleting: false
};

export default function categoryReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_CATEGORIES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          categories: payload.categories,
          isSaving: false,
          isDeleting: false
        };
      }
      return {
        ...state,
        categories: [...state.categories, ...payload.categories]
      };

    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...[payload], ...state.categories]
      };

    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === payload.id ? payload : category
        )
      };

    case types.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
