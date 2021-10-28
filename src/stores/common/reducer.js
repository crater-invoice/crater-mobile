import {formatTaxTypes} from '@/utils';
import * as types from './types';
import {
  SET_SETTINGS,
  DATE_FORMAT,
  SET_MAIL_CONFIGURATION,
  SWITCH_THEME
} from '@/constants';
import {
  SET_TAX,
  SET_EDIT_TAX,
  SET_REMOVE_TAX,
  SET_TAXES,
  SET_COMPANY_INFO,
  SET_GLOBAL_CURRENCIES,
  SET_BIOMETRY_AUTH_TYPE
} from '@/features/settings/constants';
import {lightTheme} from '@/theme';

const initialState = {
  user: null,
  currencies: [],
  locale: 'en',
  timeZone: null,
  discount_per_item: false,
  tax_per_item: false,
  notifyInvoiceViewed: false,
  notifyEstimateViewed: false,
  currency: null,
  taxTypes: [],
  loading: false,
  dateFormat: DATE_FORMAT,
  endpointApi: null,
  endpointURL: null,
  mailDriver: null,
  fiscalYear: '2-1',
  biometryAuthType: null,
  lastOTACheckDate: null,
  theme: lightTheme,
  abilities: [],
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

    case SET_COMPANY_INFO:
      return {...state, company: payload.company};

    case types.FETCH_BOOTSTRAP_SUCCESS:
      const {
        current_user,
        current_company_currency,
        moment_date_format,
        fiscal_year,
        current_user_settings,
        current_user_abilities = []
      } = payload;

      return {
        ...state,
        ...payload,
        user: current_user,
        currency: current_company_currency,
        abilities: current_user_abilities,
        dateFormat: moment_date_format,
        fiscalYear: fiscal_year,
        locale: current_user_settings?.language ?? 'en'
      };

    case SET_TAXES:
      if (!payload.fresh) {
        return {
          ...state,
          taxTypes: [...state.taxTypes, ...formatTaxTypes(payload.taxTypes)]
        };
      }

      return {...state, taxTypes: formatTaxTypes(payload.taxTypes)};

    case SET_TAX:
      const tax = formatTaxTypes(payload.taxType);

      return {
        ...state,
        taxTypes: [...tax, ...state.taxTypes]
      };

    case SET_EDIT_TAX:
      let editTax = formatTaxTypes(payload.taxType);
      const taxTypeList = state.taxTypes.filter(
        ({fullItem}) => fullItem.id !== payload.id
      );

      return {
        ...state,
        taxTypes: [...editTax, ...taxTypeList]
      };

    case SET_REMOVE_TAX:
      const remainTaxes = state.taxTypes.filter(
        ({fullItem}) => fullItem.id !== payload.id
      );

      return {...state, taxTypes: remainTaxes};

    case SET_SETTINGS:
      return {
        ...state,
        ...(payload?.settings?.language && {
          locale: payload.settings.language
        }),
        ...(payload?.settings?.selectedCurrency && {
          currency: payload.settings.selectedCurrency
        })
      };

    case SET_MAIL_CONFIGURATION:
      return {...state, mailDriver: payload.mailDriver};

    case SET_GLOBAL_CURRENCIES:
      return {...state, currencies: payload?.currencies};

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
