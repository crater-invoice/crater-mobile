import {ROUTES} from '@/navigation';
import {PermissionService} from '@/services';
import { isSuperAdmin } from '@/stores/common/helpers';
import t from 'locales/use-translation';

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

export const MORE_MENU = () => {
  return [
    {
      title: t('more.estimate'),
      leftIcon: 'file-alt',
      leftIconSolid: true,
      iconSize: 19,
      fullItem: {route: ROUTES.ESTIMATE_LIST},
      show: PermissionService.isAllowToView(ROUTES.ESTIMATE_LIST)
    },
    {
      title: t('more.items'),
      leftIcon: 'product-hunt',
      iconSize: 20,
      fullItem: {route: ROUTES.GLOBAL_ITEMS},
      show: PermissionService.isAllowToView(ROUTES.GLOBAL_ITEMS)
    },
    {
      title: t('more.reports'),
      leftIcon: 'signal',
      iconSize: 15,
      fullItem: {route: ROUTES.REPORTS},
      show: PermissionService.isAllowToManage(SALES) ||
      PermissionService.isAllowToManage(PROFIT_AND_LOSS) ||
      PermissionService.isAllowToManage(EXPENSES) ||
      PermissionService.isAllowToManage(TAXES)
    },
    {
      title: t('more.users'),
      leftIcon: 'users',
      iconSize: 20,
      fullItem: {route: ROUTES.USERS},
      show: isSuperAdmin()
    },
    {
      title: t('more.settings'),
      leftIcon: 'cogs',
      iconSize: 17,
      fullItem: {route: ROUTES.SETTING_LIST},
      show: true
    },
    {
      title: t('more.logout'),
      leftIcon: 'sign-out-alt',
      iconSize: 19,
      fullItem: {action: 'onLogout'},
      show: true
    }
  ]
};

export const REPORTS_MENU = () => {
  const reports = [];
  PermissionService.isAllowToManage(SALES) &&
    reports.push({
      title: t('reports.sales'),
      fullItem: {
        route: ROUTES.GENERATE_REPORT,
        type: SALES
      }
    });
    
  PermissionService.isAllowToManage(PROFIT_AND_LOSS) &&
    reports.push({
      title: t('reports.profitAndLoss'),
      leftIcon: 'building',
      fullItem: {
        route: ROUTES.GENERATE_REPORT,
        type: PROFIT_AND_LOSS
      }
    });

  PermissionService.isAllowToManage(EXPENSES) &&
    reports.push({
      title: t('reports.expenses'),
      fullItem: {
        route: ROUTES.GENERATE_REPORT,
        type: EXPENSES
      }
    });

  PermissionService.isAllowToManage(TAXES) &&
    reports.push({
      title: t('reports.taxes'),
      fullItem: {
        route: ROUTES.GENERATE_REPORT,
        type: TAXES
      }
    });

  return reports;
};

export const REPORT_TYPE_OPTION = () => {
  return [
    {
      label: t('reports.byCustomer'),
      value: 'byCustomer'
    },
    {
      label: t('reports.byItem'),
      value: 'byItem'
    }
  ];
};

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
  CUSTOM: 'custom'
};

export const DATE_RANGE_OPTION = () => {
  return [
    {
      label: t('reports.today'),
      value: DATE_RANGE.TODAY
    },
    {
      label: t('reports.thisWeek'),
      value: DATE_RANGE.THIS_WEEK
    },
    {
      label: t('reports.thisMonth'),
      value: DATE_RANGE.THIS_MONTH
    },
    {
      label: t('reports.thisQuarter'),
      value: DATE_RANGE.THIS_QUARTER
    },
    {
      label: t('reports.thisYear'),
      value: DATE_RANGE.THIS_YEAR
    },
    // {
    //     label: t("reports.currentFiscalQuarter", ),
    //     value: DATE_RANGE.CURRENT_FISCAL_QUARTER
    // },
    {
      label: t('reports.currentFiscalYear'),
      value: DATE_RANGE.CURRENT_FISCAL_YEAR
    },
    {
      label: t('reports.previousWeek'),
      value: DATE_RANGE.PREVIOUS_WEEK
    },
    {
      label: t('reports.previousMonth'),
      value: DATE_RANGE.PREVIOUS_MONTH
    },
    {
      label: t('reports.previousQuarter'),
      value: DATE_RANGE.PREVIOUS_QUARTER
    },
    {
      label: t('reports.previousYear'),
      value: DATE_RANGE.PREVIOUS_YEAR
    },
    // {
    //     label: t("reports.previousFiscalQuarter", ),
    //     value: DATE_RANGE.PREVIOUS_FISCAL_QUARTER
    // },
    {
      label: t('reports.previousFiscalYear'),
      value: DATE_RANGE.PREVIOUS_FISCAL_YEAR
    },
    {
      label: t('reports.custom'),
      value: DATE_RANGE.CUSTOM
    }
  ];
};
