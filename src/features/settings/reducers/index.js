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
    },
    preferences: null,
    categories: [],
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


        default:
            return state;
    }
}