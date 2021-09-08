import { isArray } from '@/constants';
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
    SET_CURRENCIES,
    SET_CUSTOM_FIELDS,
    SET_LANGUAGES,
    SET_NOTES,
    CREATE_FROM_NOTES,
    REMOVE_FROM_NOTES,
    UPDATE_FROM_NOTES,
    CREATE_FROM_CUSTOM_FIELDS,
    REMOVE_FROM_CUSTOM_FIELDS,
    UPDATE_FROM_CUSTOM_FIELDS
} from '../constants';

const initialState = {
    loading: {
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
        expenseCategoryLoading: false,
        initExpenseCategoryLoading: false,
        // taxes
        addTaxLoading: false,
        getTaxLoading: false,
        removeTaxLoading: false,
        // Currencies
        currenciesLoading: false,
        currencyLoading: false,
        // Custom Fields
        customFieldLoading: false,
        getCustomFieldLoading: false,
        removeCustomFieldLoading: false,
        // Notes
        getNotesLoading: false
    },
    preferences: null,
    categories: [],
    currencies: [],
    customFields: [],
    account: null,
    taxByItems: false,
    taxByInvoice: true,
    taxByEstimate: false,
    notes: []
};

export default function settingReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SETTINGS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        case SET_ACCOUNT_INFO:
            return { ...state, ...payload };

        case SET_PREFERENCES:
            return { ...state, ...payload };

        case CLEAR_PREFERENCES:
            return { ...state, preferences: null };

        case SET_SETTING_ITEM:
            const { key, value } = payload;
            if (key === 'discount_per_item') {
                return { ...state, discountPerItem: value };
            }

            if (key === 'tax_per_item') return { ...state, taxPerItem: value };
            else return { ...state, ...payload };

        case SET_EXPENSE_CATEGORIES:
            if (!payload.fresh) {
                return {
                    ...state,
                    categories: [...state.categories, ...payload.categories]
                };
            }

            return { ...state, categories: payload.categories };

        case SET_NOTES:
            if (!payload.fresh) {
                return {
                    ...state,
                    notes: [...state.notes, ...payload.notes]
                };
            }

            return { ...state, notes: payload.notes };

        case SET_CREATE_EXPENSE_CATEGORIES:
            return {
                ...state,
                categories: [...payload.categories, ...state.categories]
            };

        case SET_EDI_EXPENSE_CATEGORIES:
            let itemIndex = 0;

            state.categories.map((val, index) => {
                if (val.id === payload.id) itemIndex = index;
            });

            state.categories.splice(itemIndex, 1);

            return {
                ...state,
                categories: [...payload.categories, ...state.categories]
            };

        case SET_REMOVE_EXPENSE_CATEGORIES:
            const category = state.categories.filter(
                val => val.id !== payload.id
            );

            return { ...state, categories: category };

        case SET_CURRENCIES:
            const { currencies } = payload;

            return { ...state, currencies };

        case SET_LANGUAGES:
            const { languages } = payload;

            return { ...state, languages };

        case SET_CUSTOM_FIELDS:
            if (!payload.fresh) {
                return {
                    ...state,
                    customFields: [
                        ...state.customFields,
                        ...payload.customFields
                    ]
                };
            }
            return { ...state, customFields: payload.customFields };

        case CREATE_FROM_NOTES:
            return {
                ...state,
                notes: [...[payload.note], ...state.notes]
            };

        case REMOVE_FROM_NOTES: {
            const noteID = payload.id;
            const filterNote = state.notes.filter(note => note.id !== noteID);

            return {
                ...state,
                notes: filterNote
            };
        }

        case UPDATE_FROM_NOTES: {
            const noteData = payload.note;
            const notesList = [];

            if (!isArray(state.notes)) {
                return { ...state };
            }

            state.notes.map(note => {
                let value = note;

                if (note.id === noteData.id) {
                    value = {
                        ...noteData
                    };
                }
                notesList.push(value);
            });

            return {
                ...state,
                notes: notesList
            };
        }

        case CREATE_FROM_CUSTOM_FIELDS:
            return {
                ...state,
                customFields: [...[payload.customField], ...state.customFields]
            };

        case REMOVE_FROM_CUSTOM_FIELDS: {
            const customFieldID = payload.id;

            const filterCustomField = state.customFields.filter(
                customField => customField.id !== customFieldID
            );

            return {
                ...state,
                customFields: filterCustomField
            };
        }

        case UPDATE_FROM_CUSTOM_FIELDS: {
            const customFieldData = payload.customField;
            const customFieldsList = [];

            if (state.customFields) {
                state.customFields.map(customfield => {
                    const { id } = customfield;
                    let value = customfield;

                    if (id === customFieldData.id) {
                        value = {
                            ...customFieldData
                        };
                    }
                    customFieldsList.push(value);
                });
            }

            return {
                ...state,
                customFields: customFieldsList
            };
        }

        default:
            return state;
    }
}
