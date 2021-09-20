import {find} from 'lodash';
import {hasValue, isEmpty, toObject} from '@/constants';
import {routes} from '@/navigation/navigation-routes';

const abilities = [
  // User
  {route: routes.USERS, ability: 'view-user'},
  {route: routes.USERS, ability: 'create-user'},
  {route: routes.CREATE_USER, ability: 'edit-user'},
  {route: routes.CREATE_USER, ability: 'delete-user'},

  // Customer
  {route: routes.MAIN_CUSTOMERS, ability: 'view-customer'},
  {route: routes.MAIN_CUSTOMERS, ability: 'create-customer'},
  {route: routes.CUSTOMER, ability: 'edit-customer'},
  {route: routes.CUSTOMER, ability: 'delete-customer'},

  // Item
  {route: routes.GLOBAL_ITEMS, ability: 'view-item'},
  {route: routes.GLOBAL_ITEMS, ability: 'create-item'},
  {route: routes.GLOBAL_ITEM, ability: 'edit-item'},
  {route: routes.GLOBAL_ITEM, ability: 'delete-item'},

  // Unit
  {route: 'customize.ITEMS', ability: 'view-unit'},
  {route: 'customize.ITEMS', ability: 'create-unit'},
  {route: 'customize.ITEMS', ability: 'edit-unit'},
  {route: 'customize.ITEMS', ability: 'delete-unit'},

  // Estimate
  {route: routes.ESTIMATE_LIST, ability: 'view-estimate'},
  {route: routes.ESTIMATE_LIST, ability: 'create-estimate'},
  {route: routes.ESTIMATE, ability: 'edit-estimate'},
  {route: routes.ESTIMATE, ability: 'delete-estimate'},
  {route: routes.ESTIMATE, ability: 'send-estimate'},

  // Invoice
  {route: routes.MAIN_INVOICES, ability: 'view-invoice'},
  {route: routes.MAIN_INVOICES, ability: 'create-invoice'},
  {route: routes.INVOICE, ability: 'edit-invoice'},
  {route: routes.INVOICE, ability: 'delete-invoice'},
  {route: routes.INVOICE, ability: 'send-invoice'},

  // Recurring Invoice
  {route: routes.RECURRING_INVOICES, ability: 'view-recurring-invoice'},
  {route: routes.RECURRING_INVOICES, ability: 'create-recurring-invoice'},
  {route: routes.RECURRING_INVOICE, ability: 'edit-recurring-invoice'},
  {route: routes.RECURRING_INVOICE, ability: 'delete-recurring-invoice'},
  {route: routes.RECURRING_INVOICE, ability: 'send-recurring-invoice'},

  // Payment
  {route: routes.MAIN_PAYMENTS, ability: 'view-payment'},
  {route: routes.MAIN_PAYMENTS, ability: 'create-payment'},
  {route: routes.PAYMENT, ability: 'edit-payment'},
  {route: routes.PAYMENT, ability: 'delete-payment'},
  {route: routes.PAYMENT, ability: 'send-payment'},

  // Expense Category
  {route: routes.CATEGORIES, ability: 'view-expense-category'},
  {route: routes.CATEGORIES, ability: 'create-expense-category'},
  {route: routes.CATEGORY, ability: 'edit-expense-category'},
  {route: routes.CATEGORY, ability: 'delete-expense-category'},

  // Expense
  {route: routes.MAIN_EXPENSES, ability: 'view-expense'},
  {route: routes.MAIN_EXPENSES, ability: 'create-expense'},
  {route: routes.EXPENSE, ability: 'edit-expense'},
  {route: routes.EXPENSE, ability: 'delete-expense'},

  // Note
  {route: routes.NOTES, ability: 'view-note'},
  {route: routes.NOTES, ability: 'create-note'},
  {route: routes.NOTE, ability: 'edit-note'},
  {route: routes.NOTE, ability: 'delete-note'},

  // Tax Type
  {route: routes.TAXES, ability: 'view-tax-type'},
  {route: routes.TAXES, ability: 'create-tax-type'},
  {route: routes.TAX, ability: 'edit-tax-type'},
  {route: routes.TAX, ability: 'delete-tax-type'},

  // Payment Method
  {route: 'customize.PAYMENTS', ability: 'view-payment-method'},
  {route: 'customize.PAYMENTS', ability: 'create-payment-method'},
  {route: 'customize.PAYMENTS', ability: 'edit-payment-method'},
  {route: 'customize.PAYMENTS', ability: 'delete-payment-method'},

  // Custom Field
  {route: routes.CUSTOM_FIELDS, ability: 'view-custom-field'},
  {route: routes.CUSTOM_FIELDS, ability: 'create-custom-field'},
  {route: routes.CUSTOMER_FIELD, ability: 'edit-custom-field'},
  {route: routes.CUSTOMER_FIELD, ability: 'delete-custom-field'},

  // Role
  {route: routes.ROLES, ability: 'view-role'},
  {route: routes.ROLES, ability: 'create-role'},
  {route: routes.CREATE_ROLE, ability: 'edit-role'},
  {route: routes.CREATE_ROLE, ability: 'delete-role'},

  // Settings
  {route: 'reportType/SALES', ability: 'sales-report'},
  {route: 'reportType/EXPENSES', ability: 'expense-report'},
  {route: 'reportType/PROFIT_AND_LOSS', ability: 'pnl-report'},
  {route: 'reportType/TAXES', ability: 'tax-report'},
  {route: routes.COMPANY_INFO, ability: 'company-settings'}
];

class Service {
  permissions: any;

  constructor() {
    this.permissions = [];
  }

  setPermissions = permissions => {
    if (!isEmpty(permissions)) {
      this.permissions = permissions;
    }
  };

  isSuperAdmin = () => {
    if (isEmpty(this.permissions)) {
      return true;
    }

    if (this.permissions?.[0]?.title === 'All abilities') {
      return true;
    }

    return false;
  };

  hasPermission = ability => {
    if (!hasValue(ability)) {
      return true;
    }

    if (this.isSuperAdmin()) {
      return true;
    }

    return hasValue(find(this.permissions, {name: ability}));
  };

  isAllowToCreate = route => {
    const ability = toObject(
      abilities.filter(a => a.route === route && a.ability.includes('create'))
    )?.ability;
    return this.hasPermission(ability);
  };

  isAllowToEdit = route => {
    const ability = toObject(
      abilities.filter(a => a.route === route && a.ability.includes('edit'))
    )?.ability;
    return this.hasPermission(ability);
  };

  isAllowToDelete = route => {
    const ability = toObject(
      abilities.filter(a => a.route === route && a.ability.includes('delete'))
    )?.ability;
    return this.hasPermission(ability);
  };

  isAllowToView = route => {
    const ability = toObject(
      abilities.filter(a => a.route === route && a.ability.includes('view'))
    )?.ability;
    return this.hasPermission(ability);
  };

  isAllowToManage = route => {
    const ability = toObject(abilities.filter(a => a.route === route))?.ability;
    return this.hasPermission(ability);
  };
}

export const PermissionService = new Service();
