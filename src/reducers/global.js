import {
    SET_GLOBAL_BOOTSTRAP,
    SET_SETTINGS,
    GLOBAL_TRIGGER_SPINNER,
    DATE_FORMAT,
    SAVE_ENDPOINT_API,
    SET_APP_VERSION,
} from "../api/consts";
import { SET_TAX, SET_EDIT_TAX, SET_REMOVE_TAX, SET_TAXES, SET_COMPANY_INFO } from "../features/settings/constants";
import { formatTaxTypes } from "../api/global";

const initialState = {
    customers: [],
    currencies: [],
    language: 'en',
    timeZone: null,
    discountPerItem: false,
    taxPerItem: false,
    notifyInvoiceViewed: false,
    notifyEstimateViewed: false,
    currency: null,
    company: null,
    taxTypes: [],
    loading: false,
    dateFormat: DATE_FORMAT,
    endpointApi: null,
    endpointURL: null,
    fiscalYear: '2-1',
    appVersion: '1.0.0'
};

export default function globalReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case GLOBAL_TRIGGER_SPINNER:
            const { appLoginLoading } = payload

            return { ...state, loading: appLoginLoading }

        case SAVE_ENDPOINT_API:

            const { endpointURL = '' } = payload

            return {
                ...state,
                endpointURL,
                endpointApi: endpointURL ? `${endpointURL}/api/` : null
            };

        case SET_COMPANY_INFO:
            return { ...state, company: payload.company }

        case SET_APP_VERSION:

            const { app_version } = payload
            return { ...state, appVersion: app_version }

        case SET_GLOBAL_BOOTSTRAP:

            const {
                currencies,
                customers,
                default_currency,
                company,
                taxTypes,
                moment_date_format,
                fiscal_year,
                default_language = 'en'
            } = payload

            const taxList = formatTaxTypes(taxTypes)

            return {
                ...state,
                currencies,
                customers,
                currency: default_currency,
                company,
                dateFormat: moment_date_format,
                taxTypes: taxList,
                fiscalYear: fiscal_year,
                language: default_language
            };

        case SET_TAXES:

            const taxes = formatTaxTypes(payload.taxTypes)

            return { ...state, taxTypes: taxes };

        case SET_TAX:

            const tax = formatTaxTypes(payload.taxType)

            return {
                ...state,
                taxTypes: [...tax, ...state.taxTypes]
            };

        case SET_EDIT_TAX:

            let editTax = formatTaxTypes(payload.taxType)
            const taxTypeList = state.taxTypes.filter(({ fullItem }) =>
                (fullItem.id !== payload.taxId))

            return {
                ...state,
                taxTypes: [...editTax, ...taxTypeList]
            };

        case SET_REMOVE_TAX:

            const remainTaxes = state.taxTypes.filter(({ fullItem }) =>
                (fullItem.id !== payload.taxId))

            return { ...state, taxTypes: remainTaxes };

        case SET_SETTINGS:

            let { key, value } = payload.settings

            if (key) {
                if (key === 'discount_per_item') {
                    return {
                        ...state,
                        discountPerItem: value === 'YES' ? true : false
                    };
                }
                if (key === 'tax_per_item') {
                    return {
                        ...state,
                        taxPerItem: value === 'YES' ? true : false
                    };
                }
                if (key === 'notify_invoice_viewed') {
                    return {
                        ...state,
                        notifyInvoiceViewed: value === 'YES' ? true : false
                    };
                }
                if (key === 'notify_estimate_viewed') {
                    return {
                        ...state,
                        notifyEstimateViewed: value === 'YES' ? true : false
                    };
                }
            }
            else
                return {
                    ...state,
                    language: payload.settings.language,
                    timeZone: payload.settings.time_zone,
                    dateFormat: payload.settings.moment_date_format,
                    fiscalYear: payload.settings.fiscal_year,
                    currency: payload.currency,
                };

        default:
            return state;
    }
}
