import * as types from './types';

const initialState = {
  units: [],
  isSaving: false,
  isDeleting: false
};

export default function itemUnitReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_ITEM_UNITS_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          units: payload.units,
          isSaving: false,
          isDeleting: false
        };
      }

      return {...state, units: [...state.units, ...payload.units]};

    case types.ADD_ITEM_UNIT_SUCCESS:
      return {
        ...state,
        units: [payload, ...state.units]
      };

    case types.UPDATE_ITEM_UNIT_SUCCESS:
      return {
        ...state,
        units: state.units.map(unit =>
          unit.id === payload.id ? payload : unit
        )
      };

    case types.REMOVE_ITEM_UNIT_SUCCESS:
      return {
        ...state,
        units: state.units.filter(({id}) => id !== payload.id)
      };

    default:
      return state;
  }
}
