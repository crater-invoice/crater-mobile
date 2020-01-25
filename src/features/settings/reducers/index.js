import {
    SETTINGS_TRIGGER_SPINNER,
    SET_ACCOUNT_INFO,
    SET_PREFERENCES,
    CLEAR_PREFERENCES,
    SET_SETTING_ITEM,
    SET_CREATE_EXPENSE_CATEGORIES,
    SET_EDI_EXPENSE_CATEGORIES,
    SET_REMOVE_EXPENSE_CATEGORIES,
    SET_EXPENSE_CATEGORIES,
    SET_CUSTOMIZE_SETTINGS,
    SET_PAYMENT_MODES,
    SET_PAYMENT_MODE,
    SET_ITEM_UNITS,
    SET_ITEM_UNIT,
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
    categories: [],
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

        case SET_EXPENSE_CATEGORIES:

            return { ...state, ...payload };

        case SET_CREATE_EXPENSE_CATEGORIES:

            return {
                ...state, categories:
                    [...payload.categories, ...state.categories]
            };

        case SET_EDI_EXPENSE_CATEGORIES:

            let itemIndex = 0;

            state.categories.map((val, index) => {
                if (val.id === payload.id)
                    itemIndex = index
            })

            state.categories.splice(itemIndex, 1)

            return {
                ...state,
                categories: [...payload.categories, ...state.categories]
            }

        case SET_REMOVE_EXPENSE_CATEGORIES:

            const category = state.categories.filter((val) =>
                (val.id !== payload.id))

            return { ...state, categories: category };

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

        case SET_ITEM_UNITS:
            return { ...state, units: payload.units };

        case SET_ITEM_UNIT:
            const { unit } = payload

            if (payload.isCreated) {
                return {
                    ...state,
                    units: [...unit, ...state.units]
                };
            }
            if (payload.isUpdated) {
                const unitList = state.units.filter(({ id }) =>
                    (id !== unit[0]["id"]))

                return {
                    ...state,
                    units: [...unit, ...unitList]
                };
            }
            if (payload.isRemove) {
                const remainUnits = state.units.filter(({ id }) =>
                    (id !== payload.id))

                return { ...state, units: remainUnits };
            }

            return { ...state }

        default:
            return state;
    }
}