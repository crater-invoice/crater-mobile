import { formatTaxTypes } from '@/utils';
import {
    SET_GLOBAL_BOOTSTRAP,
    SET_SETTINGS,
    GLOBAL_TRIGGER_SPINNER,
    DATE_FORMAT,
    SAVE_ENDPOINT_API,
    SET_APP_VERSION,
    SET_MAIL_CONFIGURATION
} from '@/constants';
import {
    SET_TAX,
    SET_EDIT_TAX,
    SET_REMOVE_TAX,
    SET_TAXES,
    SET_COMPANY_INFO,
    SET_GLOBAL_CURRENCIES,
    SET_BIOMETRY_AUTH_TYPE
} from '../features/settings/constants';

const initialState = {
    customers: [],
    currencies: [],
    locale: 'en',
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
    mailDriver: null,
    fiscalYear: '2-1',
    appVersion: '1.0.0',
    biometryAuthType: null
};

export default function globalReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case GLOBAL_TRIGGER_SPINNER:
            return { ...state, loading: false };

        case SAVE_ENDPOINT_API:
            const { endpointURL = '' } = payload;

            return {
                ...state,
                endpointURL,
                endpointApi: endpointURL ? `${endpointURL}/api/v1/` : null
            };

        case SET_COMPANY_INFO:
            return { ...state, company: payload.company };

        case SET_APP_VERSION:
            const { app_version } = payload;
            return { ...state, appVersion: app_version };

        case SET_GLOBAL_BOOTSTRAP:
            const {
                default_currency,
                company,
                moment_date_format,
                fiscal_year,
                default_language = 'en'
            } = payload;

            return {
                ...state,
                currency: default_currency,
                company,
                dateFormat: moment_date_format,
                fiscalYear: fiscal_year,
                locale: default_language
            };

        case SET_TAXES:
            if (!payload.fresh) {
                return {
                    ...state,
                    taxTypes: [
                        ...state.taxTypes,
                        ...formatTaxTypes(payload.taxTypes)
                    ]
                };
            }

            return { ...state, taxTypes: formatTaxTypes(payload.taxTypes) };

        case SET_TAX:
            const tax = formatTaxTypes(payload.taxType);

            return {
                ...state,
                taxTypes: [...tax, ...state.taxTypes]
            };

        case SET_EDIT_TAX:
            let editTax = formatTaxTypes(payload.taxType);
            const taxTypeList = state.taxTypes.filter(
                ({ fullItem }) => fullItem.id !== payload.taxId
            );

            return {
                ...state,
                taxTypes: [...editTax, ...taxTypeList]
            };

        case SET_REMOVE_TAX:
            const remainTaxes = state.taxTypes.filter(
                ({ fullItem }) => fullItem.id !== payload.taxId
            );

            return { ...state, taxTypes: remainTaxes };

        case SET_SETTINGS:
            let { key, value } = payload.settings;

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
            } else
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
            return { ...state, mailDriver: payload.mailDriver };

        case SET_GLOBAL_CURRENCIES:
            return { ...state, currencies: payload?.currencies };

        case SET_BIOMETRY_AUTH_TYPE:
            return { ...state, biometryAuthType: payload };

        default:
            return state;
    }
}
