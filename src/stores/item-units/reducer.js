import {isEmpty} from '@/constants';
import * as types from './types';

const initialState = {
  loading: {
    itemUnitsLoading: false,
    itemUnitLoading: false
  },
  units: []
};

export default function itemUnitReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {
        ...state,
        loading: {...state.loading, ...payload}
      };

    case types.FETCH_ITEM_UNITS_SUCCESS:
      if (payload.fresh) {
        return {...state, units: payload.units};
      }

      return {...state, units: [...state.units, ...payload.units]};

    case types.ADD_ITEM_UNIT_SUCCESS:
      return {
        ...state,
        units: [payload, ...state.units]
      };

    case types.UPDATE_ITEM_UNIT_SUCCESS:
      const unitData = payload;
      const unitList = [];

      if (isEmpty(state.units)) {
        return state;
      }

      state.units.map(unit => {
        const {id} = unit;
        let value = unit;

        if (id === unitData.id) {
          value = unitData;
        }
        unitList.push(value);
      });

      return {...state, units: unitList};

    case types.REMOVE_ITEM_UNIT_SUCCESS:
      return {
        ...state,
        units: state.units.filter(({id}) => id !== payload.id)
      };

    default:
      return state;
  }
}
