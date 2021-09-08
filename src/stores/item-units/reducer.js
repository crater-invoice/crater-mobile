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
    case types.SET_ITEM_UNITS:
      if (!payload.fresh) {
        return {
          ...state,
          units: [...state.units, ...payload.units]
        };
      }
      return {...state, units: payload.units};

    case types.SET_ITEM_UNIT:
      const {unit} = payload;

      if (payload.isCreated) {
        return {
          ...state,
          units: [...unit, ...state.units]
        };
      }
      if (payload.isUpdated) {
        const units = [];

        state.units.map(_ => {
          let value = _;
          _.id === unit.id && (value = unit);
          units.push(value);
        });

        return {
          ...state,
          units
        };
      }
      if (payload.isRemove) {
        const remainUnits = state.units.filter(({id}) => id !== payload.id);

        return {...state, units: remainUnits};
      }

      return {...state};

    default:
      return state;
  }
}
