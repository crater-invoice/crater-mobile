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
  {route: routes.CREATE_CUSTOMER, ability: 'edit-customer'},
  {route: routes.CREATE_CUSTOMER, ability: 'delete-customer'},

  // Item
  {route: routes.GLOBAL_ITEMS, ability: 'view-item'},
  {route: routes.GLOBAL_ITEMS, ability: 'create-item'},
  {route: routes.GLOBAL_ITEM, ability: 'edit-item'},
  {route: routes.GLOBAL_ITEM, ability: 'delete-item'},

  // Estimate
  {route: routes.ESTIMATES, ability: 'view-estimate'},
  {route: routes.ESTIMATES, ability: 'create-estimate'},
  {route: routes.CREATE_ESTIMATE, ability: 'edit-estimate'},
  {route: routes.CREATE_ESTIMATE, ability: 'delete-estimate'},
  {route: routes.CREATE_ESTIMATE, ability: 'send-estimate'},

  // Invoice
  {route: routes.MAIN_INVOICES, ability: 'view-invoice'},
  {route: routes.MAIN_INVOICES, ability: 'create-invoice'},
  {route: routes.CREATE_INVOICE, ability: 'edit-invoice'},
  {route: routes.CREATE_INVOICE, ability: 'delete-invoice'},
  {route: routes.CREATE_INVOICE, ability: 'send-invoice'},

  // Recurring Invoice
  {route: routes.RECURRING_INVOICES, ability: 'view-recurring-invoice'},
  {route: routes.RECURRING_INVOICES, ability: 'create-recurring-invoice'},
  {route: routes.CREATE_RECURRING_INVOICE, ability: 'edit-recurring-invoice'},
  {route: routes.CREATE_RECURRING_INVOICE, ability: 'delete-recurring-invoice'},
  {route: routes.CREATE_RECURRING_INVOICE, ability: 'send-recurring-invoice'},

  // Payment
  {route: routes.MAIN_PAYMENTS, ability: 'view-payment'},
  {route: routes.MAIN_PAYMENTS, ability: 'create-payment'},
  {route: routes.PAYMENT, ability: 'edit-payment'},
  {route: routes.PAYMENT, ability: 'delete-payment'},
  {route: routes.PAYMENT, ability: 'send-payment'},

  // Expense
  {route: routes.MAIN_EXPENSES, ability: 'view-expense'},
  {route: routes.MAIN_EXPENSES, ability: 'create-expense'},
  {route: routes.EXPENSE, ability: 'edit-expense'},
  {route: routes.EXPENSE, ability: 'delete-expense'},

  // Tax Type
  {route: routes.TAXES, ability: 'view-tax-type'},
  {route: routes.TAXES, ability: 'create-tax-type'},
  {route: routes.CREATE_TAX, ability: 'edit-tax-type'},
  {route: routes.CREATE_TAX, ability: 'delete-tax-type'},

  // Custom Field
  {route: routes.CUSTOM_FIELDS, ability: 'view-custom-field'},
  {route: routes.CUSTOM_FIELDS, ability: 'create-custom-field'},
  {route: routes.CUSTOM_FIELD, ability: 'edit-custom-field'},
  {route: routes.CUSTOM_FIELD, ability: 'delete-custom-field'},

  // Role
  {route: routes.ROLES, ability: 'view-role'},
  {route: routes.ROLES, ability: 'create-role'},
  {route: routes.CREATE_ROLE, ability: 'edit-role'},
  {route: routes.CREATE_ROLE, ability: 'delete-role'},

  // Settings
  {route: routes.REPORTS, ability: 'view-report'},
  {route: routes.NOTES, ability: 'note-settings'},
  {route: routes.CREATE_COMPANY, ability: 'company-settings'}
];

class Service {
  currentAbilities: any;

  constructor() {
    this.currentAbilities = [];
  }

  setPermissions = currentAbilities => {
    if (!isEmpty(currentAbilities)) {
      this.currentAbilities = currentAbilities;
    }
  };

  isSuperAdmin = () => {
    if (isEmpty(this.currentAbilities)) {
      return true;
    }

    if (this.currentAbilities?.[0]?.title === 'All abilities') {
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

    return hasValue(find(this.currentAbilities, {name: ability}));
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

  isAllowToSend = route => {
    const ability = toObject(
      abilities.filter(a => a.route === route && a.ability.includes('send'))
    )?.ability;
    return this.hasPermission(ability);
  };
}

export const PermissionService = new Service();
