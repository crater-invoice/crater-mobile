import * as types from './types.js';

const initialState = {
  languages: [],
  timezones: [],
  dateFormats: [],
  fiscalYears: [],
  currencies: [],
  retrospectiveEdits: [],
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

    case types.FETCH_CURRENCIES_SUCCESS:
      return {...state, currencies: payload};

    case types.FETCH_LANGUAGES_SUCCESS:
      return {...state, languages: payload};

    case types.FETCH_TIMEZONES_SUCCESS:
      return {...state, timezones: payload};

    case types.FETCH_DATE_FORMATS_SUCCESS:
      return {...state, dateFormats: payload};

    case types.FETCH_FISCAL_YEARS_SUCCESS:
      return {...state, fiscalYears: payload};

    case types.FETCH_RETROSPECTIVES_SUCCESS:
      return {...state, retrospectiveEdits: payload};

    default:
      return state;
  }
}
