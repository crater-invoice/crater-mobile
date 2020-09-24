import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------
export const REPORTS_SEARCH = 'moreForm/REPORTS_SEARCH';
export const REPORT_FORM = 'moreForm/REPORT_FORM';

// Actions
// -----------------------------------------

// Report
// -----------------------------------------
export const GENERATE_REPORT = 'report/GENERATE_REPORT';

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

// Endpoint Api URL
// -----------------------------------------
