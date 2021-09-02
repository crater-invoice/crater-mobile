import {find} from 'lodash';
import {hasValue, isEmpty} from '@/constants';
import {ROUTES} from '@/navigation';
import {
  SALES as SALES_REPORT,
  PROFIT_AND_LOSS as PROFIT_AND_LOSS_REPORT,
  EXPENSES as EXPENSES_REPORT,
  TAXES as TAXES_REPORT
} from '@/features/more/constants';
import {CUSTOMIZE_TYPE} from '@/features/settings/constants';

class Service {
  permissions: any;

  constructor() {
    this.permissions = [];
  }

  setPermissions = permissions => {
    this.permissions = permissions;
  };

  getName = route => {
    switch (route) {
      case ROUTES.MAIN_INVOICES:
      case ROUTES.INVOICE:
        return 'invoices';

      case ROUTES.MAIN_CUSTOMERS:
      case ROUTES.CUSTOMER:
        return 'users';

      case ROUTES.MAIN_PAYMENTS:
      case ROUTES.PAYMENT:
        return 'payments';

      case ROUTES.MAIN_EXPENSES:
      case ROUTES.EXPENSE:
        return 'expenses';

      case ROUTES.ESTIMATE_LIST:
      case ROUTES.ESTIMATE:
        return 'estimates';

      case ROUTES.GLOBAL_ITEMS:
      case ROUTES.GLOBAL_ITEM:
        return 'items';

      case SALES_REPORT:
        return 'sales-report';

      case PROFIT_AND_LOSS_REPORT:
        return 'pnl-report';

      case EXPENSES_REPORT:
        return 'expense-report';

      case TAXES_REPORT:
        return 'tax-report';

      case ROUTES.ACCOUNT_INFO:
        return 'settings-account';

      case ROUTES.COMPANY_INFO:
        return 'settings-company';

      case ROUTES.TAXES:
      case ROUTES.TAX:
        return 'tax-types';

      case ROUTES.CUSTOM_FIELDS:
      case ROUTES.CUSTOMER_FIELD:
        return 'custom-fields';

      case ROUTES.NOTES:
      case ROUTES.NOTE:
        return 'notes';

      case ROUTES.CATEGORIES:
      case ROUTES.CATEGORY:
        return 'expense-categories';

      case CUSTOMIZE_TYPE.ITEMS:
        return 'units';

      case CUSTOMIZE_TYPE.PAYMENTS:
        return 'payment-methods';

      case ROUTES.COMPANIES:
      case ROUTES.COMPANY:
        return 'company';

      case ROUTES.ROLES:
      case ROUTES.CREATE_ROLE:
        return 'role';

      case ROUTES.USERS:
      case ROUTES.CREATE_USER:
        return 'user';

      default:
        return '';
    }
  };

  hasPermission = screenName => {
    if (isEmpty(this.permissions)) {
      return true;
    }

    return hasValue(find(this.permissions, {name: screenName}));
  };

  isAllowToCreate = route => {
    const screenName = `${this.getName(route)}:create`;
    return this.hasPermission(screenName);
  };

  isAllowToEdit = route => {
    const screenName = `${this.getName(route)}:edit`;
    return this.hasPermission(screenName);
  };

  isAllowToDelete = route => {
    const screenName = `${this.getName(route)}:delete`;
    return this.hasPermission(screenName);
  };

  isAllowToView = route => {
    const screenName = `${this.getName(route)}:view`;

    if (this.hasPermission(screenName) || this.isAllowToCreate(route)) {
      return true;
    }

    return false;
  };

  isAllowToManage = route => {
    const screenName = `${this.getName(route)}:manage`;
    return this.hasPermission(screenName);
  };
}

export const PermissionService = new Service();
