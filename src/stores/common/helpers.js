import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import {store} from '..';

export const getActiveMainTab = () => {
  if (PermissionService.isAllowToView(routes.MAIN_INVOICES)) {
    return routes.MAIN_INVOICES;
  }

  if (PermissionService.isAllowToView(routes.MAIN_CUSTOMERS)) {
    return routes.MAIN_CUSTOMERS;
  }

  if (PermissionService.isAllowToView(routes.MAIN_PAYMENTS)) {
    return routes.MAIN_PAYMENTS;
  }

  if (PermissionService.isAllowToView(routes.MAIN_EXPENSES)) {
    return routes.MAIN_EXPENSES;
  }

  return routes.MAIN_MORE;
};

export const SUPER_ADMIN = 'super admin';

export const isSuperAdmin = () => {
  const role = store?.getState?.()?.common?.user?.role;
  return role === SUPER_ADMIN;
};
