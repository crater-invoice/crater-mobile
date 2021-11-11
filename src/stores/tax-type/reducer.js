import * as types from './types';

const initialState = {
  taxTypes: [],
  isSaving: false,
  isDeleting: false
};

export default function taxTypeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_TAXES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          taxTypes: payload.taxTypes,
          isSaving: false,
          isDeleting: false
        };
      }
      return {
        ...state,
        taxTypes: [...state.taxTypes, ...payload.taxTypes]
      };

    case types.ADD_TAX_SUCCESS:
      return {...state, taxTypes: [...[payload], ...state.taxTypes]};

    case types.UPDATE_TAX_SUCCESS:
      return {
        ...state,
        taxTypes: state.taxTypes.map(tax =>
          tax.id === payload.id ? payload : tax
        )
      };

    case types.REMOVE_TAX_SUCCESS:
      return {
        ...state,
        taxTypes: state.taxTypes.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
