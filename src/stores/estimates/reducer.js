import {isEmpty} from '@/constants';
import * as types from './types';

const initialState = {
  estimates: [],
  isFetchingInitialData: false,
  isLoading: false,
  isDeleting: false,
  isSaving: false,
  estimateData: {
    nextNumber: null,
    prefix: null,
    separator: null,
    estimate_auto_generate: null,
    estimateTemplates: []
  },
  selectedItems: []
};

export default function estimatesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_ESTIMATES_SUCCESS:
      if (payload.fresh) {
        return {...state, estimates: payload.estimates};
      }

      return {...state, estimates: [...state.estimates, ...payload.estimates]};

    case types.FETCH_ESTIMATE_DATA_SUCCESS:
      return {...state, estimateData: payload};

    case types.ADD_ESTIMATE_SUCCESS:
      return {...state, estimates: [...[payload], ...state.estimates]};

    case types.UPDATE_ESTIMATE_SUCCESS:
      const estimateData = payload;
      const estimateList = [];

      if (isEmpty(state.estimates)) {
        return state;
      }

      state.estimates.map(estimate => {
        const {id} = estimate;
        let value = estimate;

        if (id === estimateData.id) {
          value = estimateData;
        }
        estimateList.push(value);
      });

      return {...state, estimates: estimateList};

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
        isSaving: false,
        estimateData: {
          nextNumber: null,
          prefix: null,
          separator: null,
          estimate_auto_generate: null,
          estimateTemplates: []
        }
      };

    default:
      return state;
  }
}
