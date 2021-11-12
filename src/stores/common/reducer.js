import * as types from './types';
import {DATE_FORMAT, SET_MAIL_CONFIGURATION, SWITCH_THEME} from '@/constants';
import {SET_BIOMETRY_AUTH_TYPE} from '@/features/settings/constants';
import {lightTheme} from '@/theme/light';

const initialState = {
  locale: 'en',
  timeZone: null,
  discount_per_item: false,
  tax_per_item: false,
  notifyInvoiceViewed: false,
  notifyEstimateViewed: false,
  loading: false,
  dateFormat: DATE_FORMAT,
  endpointApi: null,
  endpointURL: null,
  mailDriver: null,
  fiscalYear: '2-1',
  biometryAuthType: null,
  lastOTACheckDate: null,
  theme: lightTheme,
  countries: []
};

export default function commonReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SAVE_ENDPOINT_URL_SUCCESS:
      return {
        ...state,
        endpointURL: payload,
        endpointApi: payload ? `${payload}/api/v1/` : null
      };

    case types.FETCH_TAX_AND_DISCOUNT_PER_ITEM_SUCCESS:
      const {tax_per_item, discount_per_item} = payload;
      return {...state, tax_per_item, discount_per_item};

    case types.FETCH_BOOTSTRAP_SUCCESS:
      const {current_company_settings, current_user_settings} = payload;

      return {
        ...state,
        ...payload,
        dateFormat: current_company_settings.moment_date_format,
        fiscalYear: current_company_settings.fiscal_year,
        locale: current_user_settings?.language ?? 'en'
      };

    case SET_MAIL_CONFIGURATION:
      return {...state, mailDriver: payload.mailDriver};

    case SET_BIOMETRY_AUTH_TYPE:
      return {...state, biometryAuthType: payload};

    case types.SET_LAST_OTA_CHECK_DATE:
      return {...state, lastOTACheckDate: payload};

    case SWITCH_THEME:
      return {...state, theme: payload};

    case types.FETCH_COUNTRIES_SUCCESS:
      return {...state, countries: payload};

    default:
      return state;
  }
}
