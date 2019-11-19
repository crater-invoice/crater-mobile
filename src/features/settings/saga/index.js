import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
    setCompanyInformation,
    setAccountInformation,
    setPreferences,
    setSettings,
    setExpenseCategories,
    setCreateExpenseCategories,
    setEditExpenseCategories,
    setRemoveExpenseCategories,
    setTaxes,
    setTax,
    setEditTax,
    setRemoveTax,
} from '../actions';

import {
    GET_COMPANY_INFO,
    EDIT_COMPANY_INFO,
    GET_ACCOUNT_INFO,
    EDIT_ACCOUNT_INFO,
    GET_PREFERENCES,
    EDIT_PREFERENCES,
    GET_SETTING_ITEM,
    EDIT_SETTING_ITEM,
    GET_EXPENSE_CATEGORIES,
    CREATE_EXPENSE_CATEGORY,
    GET_CREATE_EXPENSE_CATEGORY,
    EDIT_EXPENSE_CATEGORY,
    REMOVE_EXPENSE_CATEGORY,
    GET_TAXES,
    REMOVE_TAX,
    TAX_ADD,
    TAX_EDIT,
    // Endpoint Api URL
    GET_COMPANY_URL,
    EDIT_COMPANY_URL,
    GET_ACCOUNT_URL,
    EDIT_ACCOUNT_URL,
    GET_PREFERENCES_URL,
    GET_GENERAL_SETTING_URL,
    EDIT_PREFERENCES_URL,
    EDIT_GENERAL_SETTING_URL,
    GET_EXPENSE_CATEGORIES_URL,
    CREATE_EXPENSE_CATEGORIES_URL,
    GET_EDIT_EXPENSE_CATEGORIES_URL,
    EDIT_EXPENSE_CATEGORIES_URL,
    REMOVE_EXPENSE_CATEGORIES_URL,
    GET_SALES_TAXES_URL,
    CREATE_SALES_TAX_URL,
    EDIT_SALES_TAX_URL,
    REMOVE_SALES_TAX_URL
} from '../constants';

import Request from '../../../api/request';
import { ROUTES } from '../../../navigation/routes';

/**
 * Company Information.
 */
function* getCompanyInformation(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ getCompanyInfoLoading: true }));

    try {

        const options = {
            path: GET_COMPANY_URL(),
        };

        const response = yield call([Request, 'get'], options);
        yield put(setCompanyInformation({ company: response.user }));
        onResult && onResult(response.user)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getCompanyInfoLoading: false }));
    }
}

function* editCompanyInformation(payloadData) {
    const {
        payload: { params, navigation, logo },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editCompanyInfoLoading: true }));

    try {

        const options = {
            path: EDIT_COMPANY_URL(),
            body: params,
        };

        yield call([Request, 'post'], options);

        if (logo) {
            const options2 = {
                path: `settings/company/upload-logo`,
                image: logo,
                imageName: 'company_logo'
            }

            yield call([Request, 'post'], options2);
        }

        navigation.goBack(null)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editCompanyInfoLoading: false }));
    }
}

function* getAccountInformation(payloadData) {

    yield put(settingsTriggerSpinner({ getAccountInfoLoading: true }));

    try {

        const options = {
            path: GET_ACCOUNT_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setAccountInformation({ account: response }));

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getAccountInfoLoading: false }));
    }
}

function* editAccountInformation(payloadData) {
    const {
        payload: { params, navigation },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editAccountInfoLoading: true }));

    try {

        const options = {
            path: EDIT_ACCOUNT_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);
        yield put(setAccountInformation({ account: response.user }));
        navigation.goBack(null)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editAccountInfoLoading: false }));
    }
}

/**
 * App Settings
 * -----------------------------------------
 */
function* getPreferences(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ getPreferencesLoading: true }));

    try {

        const options = {
            path: GET_PREFERENCES_URL(),
        };

        const response = yield call([Request, 'get'], options);
        yield put(setPreferences({ preferences: response }));
        onResult && onResult(response)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getPreferencesLoading: false }));
    }
}

function* getSettingItem(payloadData) {
    const {
        payload: { key, onResult = null },
    } = payloadData;

    yield put(settingsTriggerSpinner({ getSettingItemLoading: true }));

    try {

        const options = {
            path: GET_GENERAL_SETTING_URL(key),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response[key])

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getSettingItemLoading: false }));
    }
}

function* editPreferences(payloadData) {
    const {
        payload: { params, navigation, currencies },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editPreferencesLoading: true }));

    try {

        const options = {
            path: EDIT_PREFERENCES_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);
        if (response.success) {
            let newData = currencies.filter((item) => {
                let filterData = false
                if (item['id'].toString() === params.currency.toString())
                    filterData = true

                return filterData
            });

            yield put(setSettings({
                settings: params,
                currency: newData.length !== 0 ? newData[0] : []
            }));
            navigation.goBack(null)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editPreferencesLoading: false }));
    }
}

function* editSettingItem(payloadData) {
    const {
        payload: { params, navigation = null, onResult = null },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editSettingItemLoading: true }));

    try {

        const options = {
            path: EDIT_GENERAL_SETTING_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response.success) {
            yield put(setSettings({ settings: params }));
            onResult && onResult()
        }

        if (navigation)
            navigation.goBack(null)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editSettingItemLoading: false }));
    }
}

/**
 * Expense Categories
 */
function* getExpenseCategories(payloadData) {

    yield put(settingsTriggerSpinner({ expensesCategoryLoading: true }));

    try {

        const options = {
            path: GET_EXPENSE_CATEGORIES_URL(),
        };

        const response = yield call([Request, 'get'], options);
        yield put(setExpenseCategories({ categories: response.categories }));

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expensesCategoryLoading: false }));
    }
}

function* createExpenseCategory(payloadData) {
    const {
        payload: { params, onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ expenseCategoryLoading: true }));

    try {

        const options = {
            path: CREATE_EXPENSE_CATEGORIES_URL(),
            body: params
        };

        const response = yield call([Request, 'post'], options);

        yield put(setCreateExpenseCategories({ categories: [response.category] }));

        onResult && onResult(response.category)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expenseCategoryLoading: false }));
    }
}

function* getEditExpenseCategory(payloadData) {
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ initExpenseCategoryLoading: true }));

    try {

        const options = {
            path: GET_EDIT_EXPENSE_CATEGORIES_URL(id),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response.category)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ initExpenseCategoryLoading: false }));
    }
}

function* editExpenseCategory(payloadData) {
    const {
        payload: { id, params, navigation },
    } = payloadData;


    yield put(settingsTriggerSpinner({ expenseCategoryLoading: true }));

    try {

        const options = {
            path: EDIT_EXPENSE_CATEGORIES_URL(id),
            body: params
        };

        const response = yield call([Request, 'put'], options);
        navigation.navigate(ROUTES.CATEGORIES)
        yield put(setEditExpenseCategories({ categories: [response.category], id }));

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expenseCategoryLoading: false }));
    }
}

function* removeExpenseCategory(payloadData) {
    const {
        payload: { id, navigation, onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ expenseCategoryLoading: true }));

    try {

        const options = {
            path: REMOVE_EXPENSE_CATEGORIES_URL(id),
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CATEGORIES)
            yield put(setRemoveExpenseCategories({ id }));
        }
        else
            onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expenseCategoryLoading: false }));
    }
}

/**
 * Tax Types
 */
function* getTaxTypes(payloadData) {
    const {
        payload: {
            onResult,
        } = {},
    } = payloadData;

    yield put(settingsTriggerSpinner({ getTaxesLoading: true }));

    try {

        const options = {
            path: GET_SALES_TAXES_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setTaxes({ taxTypes: response.taxTypes }));

        onResult && onResult(response);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getTaxesLoading: false }));
    }
}

function* addTax(payloadData) {
    const {
        payload: {
            tax,
            onResult,
        },
    } = payloadData;

    yield put(settingsTriggerSpinner({ addTaxLoading: true }));

    try {

        const options = {
            path: CREATE_SALES_TAX_URL(),
            body: tax
        };

        const response = yield call([Request, 'post'], options);

        yield put(setTax({ taxType: [response.taxType] }));

        onResult && onResult(response.taxType);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ addTaxLoading: false }));
    }
}

function* editTaxType(payloadData) {
    const {
        payload: {
            tax,
            onResult,
        },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editTaxLoading: true }));

    try {

        const options = {
            path: EDIT_SALES_TAX_URL(tax),
            body: tax
        };

        const response = yield call([Request, 'put'], options);

        yield put(setEditTax({ taxType: [response.taxType], taxId: tax.id }));

        onResult && onResult(response);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editTaxLoading: false }));
    }
}

function* removeTax(payloadData) {
    const {
        payload: {
            id,
            onResult,
        },
    } = payloadData;

    yield put(settingsTriggerSpinner({ removeTaxLoading: true }));

    try {

        const options = {
            path: REMOVE_SALES_TAX_URL(id),
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success)
            yield put(setRemoveTax({ taxId: id }));

        onResult && onResult(response.success);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ removeTaxLoading: false }));

    }
}


export default function* settingsSaga() {
    yield takeEvery(GET_COMPANY_INFO, getCompanyInformation);
    yield takeEvery(EDIT_COMPANY_INFO, editCompanyInformation);
    yield takeEvery(GET_ACCOUNT_INFO, getAccountInformation);
    yield takeEvery(EDIT_ACCOUNT_INFO, editAccountInformation);
    yield takeEvery(GET_PREFERENCES, getPreferences);
    yield takeEvery(GET_SETTING_ITEM, getSettingItem);
    yield takeEvery(EDIT_PREFERENCES, editPreferences);
    yield takeEvery(EDIT_SETTING_ITEM, editSettingItem);

    // Expense Categories
    // -----------------------------------------
    yield takeEvery(GET_EXPENSE_CATEGORIES, getExpenseCategories);
    yield takeEvery(CREATE_EXPENSE_CATEGORY, createExpenseCategory);
    yield takeEvery(GET_CREATE_EXPENSE_CATEGORY, getEditExpenseCategory);
    yield takeEvery(EDIT_EXPENSE_CATEGORY, editExpenseCategory);
    yield takeEvery(REMOVE_EXPENSE_CATEGORY, removeExpenseCategory);

    // Tax Types
    // -----------------------------------------
    yield takeEvery(GET_TAXES, getTaxTypes);
    yield takeEvery(TAX_ADD, addTax);
    yield takeEvery(TAX_EDIT, editTaxType);
    yield takeEvery(REMOVE_TAX, removeTax);
}
