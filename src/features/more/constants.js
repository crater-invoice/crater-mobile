import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

// Forms
// -----------------------------------------
export const REPORT_FORM = 'reports/REPORT_FORM';

// Actions
// -----------------------------------------
export const MORE_SEARCH = 'more/MORE_SEARCH';
export const MORE_TRIGGER_SPINNER = 'more/MORE_TRIGGER_SPINNER';
export const GET_MAIL_CONFIGURATION = 'GET_MAIL_CONFIGURATION';

// Report
// -----------------------------------------
export const GENERATE_REPORT = 'report/GENERATE_REPORT';

export const SALES = 'reportType/SALES';
export const PROFIT_AND_LOSS = 'reportType/PROFIT_AND_LOSS';
export const EXPENSES = 'reportType/EXPENSES';
export const TAXES = 'reportType/TAXES';

export const MORE_MENU = () => {
  return [
    {
      title: t('more.recurring_invoice'),
      leftIcon: 'file',
      leftIconSolid: true,
      iconSize: 19,
      fullItem: {route: routes.RECURRING_INVOICES},
      show: PermissionService.isAllowToView(routes.RECURRING_INVOICES)
    },
    {
      title: t('more.estimate'),
      leftIcon: 'file-alt',
      leftIconSolid: true,
      iconSize: 19,
      fullItem: {route: routes.ESTIMATES},
      show: PermissionService.isAllowToView(routes.ESTIMATES)
    },
    {
      title: t('more.items'),
      leftIcon: 'product-hunt',
      iconSize: 20,
      fullItem: {route: routes.ITEMS},
      show: PermissionService.isAllowToView(routes.ITEMS)
    },
    {
      title: t('more.users'),
      leftIcon: 'users',
      iconSize: 20,
      fullItem: {route: routes.USERS},
      show: PermissionService.isAllowToView(routes.USERS)
    },
    {
      title: t('more.reports'),
      leftIcon: 'signal',
      iconSize: 15,
      fullItem: {route: routes.REPORTS},
      show: PermissionService.isAllowToManage(routes.REPORTS)
    },
    {
      title: t('header.custom_fields'),
      leftIcon: 'cube',
      iconSize: 20,
      fullItem: {route: routes.CUSTOM_FIELDS},
      show: PermissionService.isAllowToView(routes.CUSTOM_FIELDS)
    },
    {
      title: t('settings.expense_category'),
      leftIcon: 'clipboard-list',
      iconSize: 20,
      fullItem: {route: routes.CATEGORIES},
      show: PermissionService.isAllowToView(routes.MAIN_EXPENSES)
    },
    {
      title: t('more.settings'),
      leftIcon: 'cogs',
      iconSize: 17,
      fullItem: {route: routes.SETTING_LIST},
      show: true
    },
    {
      title: t('more.logout'),
      leftIcon: 'sign-out-alt',
      iconSize: 19,
      fullItem: {action: 'onLogout'},
      show: true
    }
  ];
};

export const REPORTS_MENU = () => {
  return [
    {
      title: t('reports.sales'),
      fullItem: {
        route: routes.GENERATE_REPORT,
        type: SALES
      },
      show: true
    },
    {
      title: t('reports.profit_and_loss'),
      leftIcon: 'building',
      fullItem: {
        route: routes.GENERATE_REPORT,
        type: PROFIT_AND_LOSS
      },
      show: true
    },
    {
      title: t('reports.expenses'),
      fullItem: {
        route: routes.GENERATE_REPORT,
        type: EXPENSES
      },
      show: true
    },
    {
      title: t('reports.taxes'),
      fullItem: {
        route: routes.GENERATE_REPORT,
        type: TAXES
      },
      show: true
    }
  ];
};

export const REPORT_TYPE_OPTION = () => {
  return [
    {
      label: t('reports.by_customer'),
      value: 'by_customer'
    },
    {
      label: t('reports.by_item'),
      value: 'by_item'
    }
  ];
};

export const DATE_RANGE = {
  TODAY: 'today',
  THIS_WEEK: 'this_week',
  THIS_MONTH: 'this_month',
  THIS_QUARTER: 'this_quarter',
  THIS_YEAR: 'this_year',
  CURRENT_FISCAL_QUARTER: 'current_fiscal_quarter',
  CURRENT_FISCAL_YEAR: 'current_fiscal_year',
  PREVIOUS_WEEK: 'previous_week',
  PREVIOUS_MONTH: 'previous_month',
  PREVIOUS_QUARTER: 'previous_quarter',
  PREVIOUS_YEAR: 'previous_year',
  PREVIOUS_FISCAL_QUARTER: 'previous_fiscal_quarter',
  PREVIOUS_FISCAL_YEAR: 'previous_fiscal_year',
  CUSTOM: 'custom'
};

export const DATE_RANGE_OPTION = () => {
  return [
    {
      label: t('reports.today'),
      value: DATE_RANGE.TODAY
    },
    {
      label: t('reports.this_week'),
      value: DATE_RANGE.THIS_WEEK
    },
    {
      label: t('reports.this_month'),
      value: DATE_RANGE.THIS_MONTH
    },
    {
      label: t('reports.this_quarter'),
      value: DATE_RANGE.THIS_QUARTER
    },
    {
      label: t('reports.this_year'),
      value: DATE_RANGE.THIS_YEAR
    },
    // {
    //     label: t("reports.current_fiscal_quarter", ),
    //     value: DATE_RANGE.CURRENT_FISCAL_QUARTER
    // },
    {
      label: t('reports.current_fiscal_year'),
      value: DATE_RANGE.CURRENT_FISCAL_YEAR
    },
    {
      label: t('reports.previous_week'),
      value: DATE_RANGE.PREVIOUS_WEEK
    },
    {
      label: t('reports.previous_month'),
      value: DATE_RANGE.PREVIOUS_MONTH
    },
    {
      label: t('reports.previous_quarter'),
      value: DATE_RANGE.PREVIOUS_QUARTER
    },
    {
      label: t('reports.previous_year'),
      value: DATE_RANGE.PREVIOUS_YEAR
    },
    // {
    //     label: t("reports.previous_fiscal_quarter", ),
    //     value: DATE_RANGE.PREVIOUS_FISCAL_QUARTER
    // },
    {
      label: t('reports.previous_fiscal_year'),
      value: DATE_RANGE.PREVIOUS_FISCAL_YEAR
    },
    {
      label: t('reports.custom'),
      value: DATE_RANGE.CUSTOM
    }
  ];
};
