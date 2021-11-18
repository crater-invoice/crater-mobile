import * as types from './types.js';

const initialState = {
  languages: [],
  timezones: [],
  dateFormats: [],
  fiscalYears: [],
  currencies: [],
  companies: [],
  selectedCompany: null,
  selectedCompanyCurrency: null,
  selectedCompanySettings: null,
  isSaving: false
};

export default function companyReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_COMPANIES_SUCCESS:
      return {...state, companies: payload, isSaving: false};

    case types.SET_SELECTED_COMPANY:
      return {...state, selectedCompany: payload, isSaving: false};

    case types.FETCH_CURRENCIES_SUCCESS:
      return {...state, currencies: payload};

    case types.FETCH_TIMEZONES_SUCCESS:
      return {...state, timezones: payload};

    case types.FETCH_DATE_FORMATS_SUCCESS:
      return {...state, dateFormats: payload};

    case types.FETCH_FISCAL_YEARS_SUCCESS:
      return {...state, fiscalYears: payload};

    case types.FETCH_LANGUAGES_SUCCESS:
      return {...state, languages: payload};

    case types.SET_COMPANY_SETTING:
      return {...state, ...payload};

    case types.FETCH_COMPANY_SETTINGS_SUCCESS:
      return {
        ...state,
        selectedCompanySettings: {...state.selectedCompanySettings, ...payload}
      };

    default:
      return state;
  }
}
