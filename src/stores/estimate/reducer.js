import * as types from './types';

const initialState = {
  estimates: [],
  isFetchingInitialData: false,
  isLoading: false,
  isDeleting: false,
  isSaving: false,
  estimateTemplates: [],
  selectedItems: []
};

export default function estimateReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_ESTIMATES_SUCCESS:
      if (payload.fresh) {
        return {...state, estimates: payload.estimates};
      }

      return {...state, estimates: [...state.estimates, ...payload.estimates]};

    case types.FETCH_ESTIMATE_TEMPLATES_SUCCESS:
      return {...state, estimateTemplates: payload};

    case types.ADD_ESTIMATE_SUCCESS:
      return {...state, estimates: [...[payload], ...state.estimates]};

    case types.UPDATE_ESTIMATE_SUCCESS:
      return {
        ...state,
        estimates: state.estimates.map(estimate =>
          estimate.id === payload.id ? payload : estimate
        )
      };

    case types.REMOVE_ESTIMATE_SUCCESS:
      return {
        ...state,
        estimates: state.estimates.filter(({id}) => id !== payload)
      };

    case types.ADD_ESTIMATE_ITEM_SUCCESS:
      return {...state, selectedItems: [...state.selectedItems, ...payload]};

    case types.REMOVE_ESTIMATE_ITEM_SUCCESS:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(({id}) => id !== payload)
      };

    case types.CLEAR_ESTIMATE:
      return {
        ...state,
        selectedItems: [],
        isFetchingInitialData: false,
        isLoading: false,
        isDeleting: false,
        isSaving: false
      };

    default:
      return state;
  }
}
