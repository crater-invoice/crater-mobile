import * as types from './types.js';

const initialState = {
  timezoneList: [],
  dateFormatList: [],
  fiscalYearLst: [],
  loading: {
    fetchPreferencesLoading: false,
    updatePreferencesLoading: false
  }
};

export default function usersReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {
        ...state,
        loading: {...state.loading, ...payload}
      };

    case types.FETCH_LANGUAGES_SUCCESS:
      return {...state, ...payload};

    case types.FETCH_TIMEZONES_SUCCESS:
      return {...state, ...payload};

    case types.FETCH_DATE_FORMATS_SUCCESS:
      return {...state, ...payload};

    case types.FETCH_FISCAL_YEARS_SUCCESS:
      return {...state, ...payload};

    case types.FETCH_RETROSPECTIVES_SUCCESS:
      return {...state, ...payload};

    case types.CLEAR_PREFERENCES:
      return {...state, preferences: null};

    default:
      return state;
  }
}
