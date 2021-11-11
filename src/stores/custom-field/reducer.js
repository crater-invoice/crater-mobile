import * as types from './types';

const initialState = {
  customFields: [],
  isSaving: false,
  isDeleting: false
};

export default function customFieldReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_CUSTOM_FIELDS_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          customFields: payload.customFields,
          isSaving: false,
          isDeleting: false
        };
      }
      return {
        ...state,
        customFields: [...state.customFields, ...payload.customFields]
      };

    case types.ADD_CUSTOM_FIELD_SUCCESS:
      return {
        ...state,
        customFields: [...[payload], ...state.customFields]
      };

    case types.UPDATE_CUSTOM_FIELD_SUCCESS:
      return {
        ...state,
        customFields: state.customFields.map(c =>
          c.id === payload.id ? payload : c
        )
      };

    case types.REMOVE_CUSTOM_FIELD_SUCCESS:
      return {
        ...state,
        customFields: state.customFields.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
