import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------
export const SET_ENDPOINT_API = 'moreForm/SET_ENDPOINT_API';

export const ITEM_FORM = 'moreForm/ITEM_FORM';
export const ITEM_SEARCH = 'moreForm/ITEM_SEARCH';

export const REPORTS_SEARCH = 'moreForm/REPORTS_SEARCH';
export const REPORT_FORM = 'moreForm/REPORT_FORM';

// Actions
// -----------------------------------------
export const MORE_SEARCH = 'more/MORE_SEARCH';
export const MORE_TRIGGER_SPINNER = 'more/MORE_TRIGGER_SPINNER';
export const LOGOUT = 'more/LOGOUT';
export const ITEM_EDIT = 'more/ITEM_EDIT';
export const ITEM_ADD = 'more/ITEM_ADD';
export const CLEAR_ITEM = 'more/CLEAR_ITEM';
export const DELETE_ITEM = 'more/DELETE_ITEM';
export const REMOVE_ITEM = 'more/REMOVE_ITEM';
export const GET_ITEMS = 'more/GET_ITEMS';
export const GET_EDIT_ITEM = 'more/GET_EDIT_ITEM';
export const SET_ITEMS = 'more/SET_ITEMS';
export const SET_FILTER_ITEMS = 'more/SET_FILTER_ITEMS';
export const SET_ITEM = 'more/SET_ITEM';
export const GET_MAIL_CONFIGURATION = 'GET_MAIL_CONFIGURATION';
// Report
// -----------------------------------------
export const GENERATE_REPORT = 'report/GENERATE_REPORT';


export const ADD_ITEM = 'itemType/ADD_ITEM';
export const EDIT_ITEM = 'itemType/EDIT_ITEM';
export const SALES = 'reportType/SALES';
export const PROFIT_AND_LOSS = 'reportType/PROFIT_AND_LOSS';
export const EXPENSES = 'reportType/EXPENSES';
export const TAXES = 'reportType/TAXES';



// Menus
// -----------------------------------------
export const MORE_MENU = (language, Lng) => {
    return [
        {
            title: Lng.t("more.estimate", { locale: language }),
            leftIcon: 'file-alt',
            iconSize: 28,
            fullItem: {
                route: ROUTES.ESTIMATE_LIST
            }
        },
        {
            title: Lng.t("more.items", { locale: language }),
            leftIcon: 'product-hunt',
            iconSize: 27,
            fullItem: {
                route: ROUTES.GLOBAL_ITEMS
            }
        },
        {
            title: Lng.t("more.reports", { locale: language }),
            leftIcon: 'signal',
            fullItem: {
                route: ROUTES.REPORTS
            }
        },
        {
            title: Lng.t("more.settings", { locale: language }),
            leftIcon: 'cogs',
            fullItem: {
                route: ROUTES.SETTING_LIST
            }
        },
        {
            title: Lng.t("more.logout", { locale: language }),
            leftIcon: 'sign-out-alt',
            iconSize: 26,
            fullItem: {
                action: 'onLogout'
            }
        },
    ]
}

export const REPORTS_MENU = (language, Lng) => {
    return [
        {
            title: Lng.t("reports.sales", { locale: language }),
            fullItem: {
                route: ROUTES.GENERATE_REPORT,
                type: SALES
            }
        },
        {
            title: Lng.t("reports.profitAndLoss", { locale: language }),
            leftIcon: 'building',
            fullItem: {
                route: ROUTES.GENERATE_REPORT,
                type: PROFIT_AND_LOSS
            }
        },
        {
            title: Lng.t("reports.expenses", { locale: language }),
            fullItem: {
                route: ROUTES.GENERATE_REPORT,
                type: EXPENSES
            }
        },
        {
            title: Lng.t("reports.taxes", { locale: language }),
            fullItem: {
                route: ROUTES.GENERATE_REPORT,
                type: TAXES
            }
        },
    ]
}

export const REPORT_TYPE_OPTION = (language, Lng) => {
    return [
        {
            label: Lng.t("reports.byCustomer", { locale: language }),
            value: 'byCustomer'
        },
        {
            label: Lng.t("reports.byItem", { locale: language }),
            value: 'byItem'
        },
    ]
}

export const DATE_RANGE = {
    TODAY: 'today',
    THIS_WEEK: 'thisWeek',
    THIS_MONTH: 'thisMonth',
    THIS_QUARTER: 'thisQuarter',
    THIS_YEAR: 'thisYear',
    CURRENT_FISCAL_QUARTER: 'currentFiscalQuarter',
    CURRENT_FISCAL_YEAR: 'currentFiscalYear',
    PREVIOUS_WEEK: 'previousWeek',
    PREVIOUS_MONTH: 'previousMonth',
    PREVIOUS_QUARTER: 'previousQuarter',
    PREVIOUS_YEAR: 'previousYear',
    PREVIOUS_FISCAL_QUARTER: 'previousFiscalQuarter',
    PREVIOUS_FISCAL_YEAR: 'previousFiscalYear',
    CUSTOM: 'custom',
}

export const DATE_RANGE_OPTION = (language, Lng) => {
    return [
        {
            label: Lng.t("reports.today", { locale: language }),
            value: DATE_RANGE.TODAY
        },
        {
            label: Lng.t("reports.thisWeek", { locale: language }),
            value: DATE_RANGE.THIS_WEEK
        },
        {
            label: Lng.t("reports.thisMonth", { locale: language }),
            value: DATE_RANGE.THIS_MONTH
        },
        {
            label: Lng.t("reports.thisQuarter", { locale: language }),
            value: DATE_RANGE.THIS_QUARTER
        },
        {
            label: Lng.t("reports.thisYear", { locale: language }),
            value: DATE_RANGE.THIS_YEAR
        },
        // {
        //     label: Lng.t("reports.currentFiscalQuarter", { locale: language }),
        //     value: DATE_RANGE.CURRENT_FISCAL_QUARTER
        // },
        {
            label: Lng.t("reports.currentFiscalYear", { locale: language }),
            value: DATE_RANGE.CURRENT_FISCAL_YEAR
        },
        {
            label: Lng.t("reports.previousWeek", { locale: language }),
            value: DATE_RANGE.PREVIOUS_WEEK
        },
        {
            label: Lng.t("reports.previousMonth", { locale: language }),
            value: DATE_RANGE.PREVIOUS_MONTH
        },
        {
            label: Lng.t("reports.previousQuarter", { locale: language }),
            value: DATE_RANGE.PREVIOUS_QUARTER
        },
        {
            label: Lng.t("reports.previousYear", { locale: language }),
            value: DATE_RANGE.PREVIOUS_YEAR
        },
        // {
        //     label: Lng.t("reports.previousFiscalQuarter", { locale: language }),
        //     value: DATE_RANGE.PREVIOUS_FISCAL_QUARTER
        // },
        {
            label: Lng.t("reports.previousFiscalYear", { locale: language }),
            value: DATE_RANGE.PREVIOUS_FISCAL_YEAR
        },
        {
            label: Lng.t("reports.custom", { locale: language }),
            value: DATE_RANGE.CUSTOM
        },
    ]
}


// Item Unit
// -----------------------------------------
export const ITEM_UNITS = [
    { label: 'pc', value: 'pc' },
    { label: 'box', value: 'box' },
    { label: 'cm', value: 'cm' },
    { label: 'dz', value: 'dz' },
    { label: 'ft', value: 'ft' },
    { label: 'g', value: 'g' },
    { label: 'in', value: 'in' },
    { label: 'kg', value: 'kg' },
    { label: 'km', value: 'km' },
    { label: 'lb', value: 'lb' },
    { label: 'mg', value: 'mg' }
]

export const ITEM_DEFAULT_OPTION = {
    label: 'box', value: 'box'
}

// Endpoint Api URL
// -----------------------------------------

export const GET_ITEMS_URL = (param) => `items?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`
export const GET_EDIT_ITEMS_URL = (id) => `items/${id}/edit`
export const GET_MAIL_CONFIGURATION_URL = () => `settings/environment/mail-env`
export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (id) => `items/${id}`
export const REMOVE_ITEM_URL = (id) => `items/${id}`
