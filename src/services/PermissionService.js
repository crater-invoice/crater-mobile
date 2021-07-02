import { find } from 'lodash';
import { hasValue, isEmpty } from '@/constants';
import { ROUTES } from '@/navigation';
import {
    SALES as SALES_REPORT,
    PROFIT_AND_LOSS as PROFIT_AND_LOSS_REPORT,
    EXPENSES as EXPENSES_REPORT,
    TAXES as TAXES_REPORT
} from '@/features/more/constants';
import { CUSTOMIZE_TYPE } from '@/features/settings/constants';

class Service {
    permissions: any;

    constructor() {
        this.permissions = [
            { name: 'role:create', guard_name: '*' },
            { name: 'role:view', guard_name: '*' },
            { name: 'role:edit', guard_name: '*' },
            { name: 'role:delete', guard_name: '*' },
            { name: 'items:create', guard_name: '*' },
            { name: 'items:view', guard_name: '*' },
            { name: 'items:edit', guard_name: '*' },
            { name: 'items:delete', guard_name: '*' },
            { name: 'units:create', guard_name: '*' },
            { name: 'units:view', guard_name: '*' },
            { name: 'units:edit', guard_name: '*' },
            { name: 'units:delete', guard_name: '*' },
            { name: 'companies:create', guard_name: '*' },
            { name: 'companies:view', guard_name: '*' },
            { name: 'companies:edit', guard_name: '*' },
            { name: 'companies:delete', guard_name: '*' },
            { name: 'users:create', guard_name: '*' },
            { name: 'users:view', guard_name: '*' },
            { name: 'users:edit', guard_name: '*' },
            { name: 'users:delete', guard_name: '*' },
            { name: 'users:invite', guard_name: '*' },
            { name: 'invoices:create', guard_name: '*' },
            { name: 'invoices:view', guard_name: '*' },
            { name: 'invoices:edit', guard_name: '*' },
            { name: 'invoices:delete', guard_name: '*' },
            { name: 'invoices:send', guard_name: '*' },
            { name: 'estimates:create', guard_name: '*' },
            { name: 'estimates:view', guard_name: '*' },
            { name: 'estimates:edit', guard_name: '*' },
            { name: 'estimates:delete', guard_name: '*' },
            { name: 'estimates:send', guard_name: '*' },
            { name: 'expenses:create', guard_name: '*' },
            { name: 'expenses:view', guard_name: '*' },
            { name: 'expenses:edit', guard_name: '*' },
            { name: 'expenses:delete', guard_name: '*' },
            { name: 'payments:create', guard_name: '*' },
            { name: 'payments:view', guard_name: '*' },
            { name: 'payments:edit', guard_name: '*' },
            { name: 'payments:delete', guard_name: '*' },
            { name: 'payments:send', guard_name: '*' },
            { name: 'dashboard:view', guard_name: '*' },
            { name: 'sales-report:view', guard_name: '*' },
            { name: 'expense-report:view', guard_name: '*' },
            { name: 'pnl-report:view', guard_name: '*' },
            { name: 'tax-report:view', guard_name: '*' },
            { name: 'expense-categories:create', guard_name: '*' },
            { name: 'expense-categories:view', guard_name: '*' },
            { name: 'expense-categories:edit', guard_name: '*' },
            { name: 'expense-categories:delete', guard_name: '*' },
            { name: 'notes:create', guard_name: '*' },
            { name: 'notes:view', guard_name: '*' },
            { name: 'notes:edit', guard_name: '*' },
            { name: 'notes:delete', guard_name: '*' },
            { name: 'tax-types:create', guard_name: '*' },
            { name: 'tax-types:view', guard_name: '*' },
            { name: 'tax-types:edit', guard_name: '*' },
            { name: 'tax-types:delete', guard_name: '*' },
            { name: 'payment-methods:create', guard_name: '*' },
            { name: 'payment-methods:view', guard_name: '*' },
            { name: 'payment-methods:edit', guard_name: '*' },
            { name: 'payment-methods:delete', guard_name: '*' },
            { name: 'custom-fields:create', guard_name: '*' },
            { name: 'custom-fields:view', guard_name: '*' },
            { name: 'custom-fields:edit', guard_name: '*' },
            { name: 'custom-fields:delete', guard_name: '*' },
            { name: 'settings-account:manage', guard_name: '*' },
            { name: 'settings-company:manage', guard_name: '*' },
            { name: 'settings-backups:create', guard_name: '*' },
            { name: 'settings-backups:view', guard_name: '*' },
            { name: 'settings-backups:delete', guard_name: '*' },
            { name: 'settings-file-disk:manage', guard_name: '*' },
            { name: 'settings-update-app:manage', guard_name: '*' },
            { name: 'settings-mail-config:manage', guard_name: '*' }
        ];
    }

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

            default:
                return '';
        }
    };

    hasPermission = screenName => {
        if (isEmpty(this.permissions)) {
            return true;
        }

        return hasValue(find(this.permissions, { name: screenName }));
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
