import {
  SET_ESTIMATES,
  CLEAR_ESTIMATES,
  ESTIMATES_TRIGGER_SPINNER,
  GET_ESTIMATES,
  GET_ITEMS,
  SET_ITEMS,
  SET_ESTIMATE_ITEMS,
  REMOVE_ESTIMATE_ITEM,
  SET_EDIT_ESTIMATE,
  REMOVE_ESTIMATE_ITEMS,
  CLEAR_ESTIMATE,
  SET_ESTIMATE,
  REMOVE_FROM_ESTIMATES,
  UPDATE_FROM_ESTIMATES
} from '../constants';

const initialState = {
  estimates: [],
  items: [],
  errors: null,
  isLoading: false,
  loading: {
    estimatesLoading: false,
    estimateLoading: false,
    initEstimateLoading: false,
    removeEstimateLoading: false
  },
  estimateData: {
    estimate: null,
    estimateTemplates: [],
    nextEstimateNumber: ''
  },
  selectedItems: []
};

export default function estimatesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case SET_ESTIMATES:
      let {estimates, fresh, prepend} = payload;

      if (prepend) {
        return {
          ...state,
          estimates: [...estimates, ...state.estimates]
        };
      }

      if (!fresh) {
        return {
          ...state,
          estimates: [...state.estimates, ...estimates]
        };
      }

      return {...state, estimates};

    case CLEAR_ESTIMATES:
      return {...state, estimates: []};

    case CLEAR_ESTIMATE:
      return {
        ...state,
        selectedItems: [],
        items: [],
        estimateData: {
          estimate: null,
          estimateTemplates: []
        }
      };

    case GET_ESTIMATES:
      return {...state};

    case SET_ESTIMATE:
      return {...state, estimateData: payload};

    case SET_EDIT_ESTIMATE:
      return {...state, ...payload};

    case ESTIMATES_TRIGGER_SPINNER:
      return {...state, loading: {...state.loading, ...payload}};

    case SET_ITEMS:
      const {items} = payload;

      if (!payload.fresh) {
        return {...state, items: [...state.items, ...items]};
      }
      return {...state, items};

    case SET_ESTIMATE_ITEMS:
      return {
        ...state,
        selectedItems: [...state.selectedItems, ...payload]
      };

    case REMOVE_ESTIMATE_ITEM:
      const {id} = payload;

      const selectedItems = state.selectedItems.filter(
        val => (val.item_id || val.id) !== id
      );

      return {...state, selectedItems};

    case REMOVE_ESTIMATE_ITEMS:
      return {...state, selectedItems: []};

    case REMOVE_FROM_ESTIMATES:
      const newEstimates = state.estimates.filter(val => val.id !== payload.id);

      return {...state, estimates: newEstimates};

    case GET_ITEMS:
      return {...state};

    case UPDATE_FROM_ESTIMATES: {
      const estimateMainData = payload.estimate;
      const estimatesList = [];

      if (state.estimates) {
        state.estimates.map(estimate => {
          const {id} = estimate;
          let value = estimate;

          if (id === estimateMainData.id) {
            value = {
              ...estimateMainData
            };
          }
          estimatesList.push(value);
        });
      }

      return {
        ...state,
        estimates: estimatesList
      };
    }

    default:
      return state;
  }
}
