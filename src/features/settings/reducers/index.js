import {
    SETTINGS_TRIGGER_SPINNER,
    SET_ACCOUNT_INFO,
    SET_PREFERENCES,
    CLEAR_PREFERENCES,
    SET_SETTING_ITEM,
    SET_CUSTOMIZE_SETTINGS,
    SET_PAYMENT_MODES,
    SET_PAYMENT_MODE,
} from '../constants';

const initialState = {
    loading: {
        logoutLoading: false,
        // account
        getAccountInfoLoading: false,
        editAccountInfoLoading: false,
        // company
        getCompanyInfoLoading: false,
        editCompanyInfoLoading: false,
        // preferences
        getPreferencesLoading: false,
        editPreferencesLoading: false,
        // item
        getSettingItemLoading: false,
        setSettingItemLoading: false,
        editSettingItemLoading: false,
        // categories
        expensesCategoryLoading: false,
        expenseCategoryLoading: false,
        initExpenseCategoryLoading: false,
        // taxes
        addTaxLoading: false,
        getTaxLoading: false,
        removeTaxLoading: false,
        // customize
        getCustomizeLoading: false,
        customizeLoading: false,
        // payment method
        paymentModesLoading: false,
        paymentModeLoading: false,
        // Item Unit
        itemUnitsLoading: false,
        itemUnitLoading: false,
    },
    preferences: null,
    paymentMethods: [],
    units: [],
    customizes: null,
    account: null,
    taxByItems: false,
    taxByInvoice: true,
    taxByEstimate: false,
};

export default function settingReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SETTINGS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        case SET_ACCOUNT_INFO:
            return { ...state, ...payload };

        case SET_PREFERENCES:
            return { ...state, ...payload }

        case CLEAR_PREFERENCES:
            return { ...state, preferences: null };

        case SET_SETTING_ITEM:
            const { key, value } = payload
            if (key === 'discount_per_item') {

                return { ...state, discountPerItem: value };
            }

            if (key === 'tax_per_item')
                return { ...state, taxPerItem: value };
            else
                return { ...state, ...payload }

        case SET_CUSTOMIZE_SETTINGS:

            const checkAutoGenerateStatus = (status) => {
                return status !== null ?
                    status === 'YES' ? true : false
                    : false
            }

            const { customizes } = payload

            if (customizes === null) {
                return { ...state, customizes: null };
            }
            else {
                const {
                    invoice_auto_generate,
                    estimate_auto_generate,
                    payment_auto_generate
                } = customizes

                let customizeUpdate = {
                    ...customizes,
                    invoice_auto_generate: checkAutoGenerateStatus(invoice_auto_generate),
                    estimate_auto_generate: checkAutoGenerateStatus(estimate_auto_generate),
                    payment_auto_generate: checkAutoGenerateStatus(payment_auto_generate)
                }

                return { ...state, customizes: customizeUpdate };
            }

        case SET_PAYMENT_MODES:
            return { ...state, paymentMethods: payload.paymentMethods };

        case SET_PAYMENT_MODE:
            const { paymentMethod, isCreated, isUpdated, isRemove } = payload

            if (isCreated) {
                return {
                    ...state,
                    paymentMethods: [...paymentMethod, ...state.paymentMethods]
                };
            }
            if (isUpdated) {
                const methodList = state.paymentMethods.filter(({ id }) =>
                    (id !== paymentMethod[0]["id"]))

                return {
                    ...state,
                    paymentMethods: [...paymentMethod, ...methodList]
                };
            }
            if (isRemove) {
                const remainMethods = state.paymentMethods.filter(({ id }) =>
                    (id !== payload.id))

                return { ...state, paymentMethods: remainMethods };
            }

            return { ...state }

        default:
            return state;
    }
}
