import {ROUTES} from '@/navigation';
import {PermissionService} from '@/services';

export const getActiveMainTab = () => {
  if (PermissionService.isAllowToView(ROUTES.MAIN_INVOICES)) {
    return ROUTES.MAIN_INVOICES;
  }

  if (PermissionService.isAllowToView(ROUTES.MAIN_CUSTOMERS)) {
    return ROUTES.MAIN_CUSTOMERS;
  }

  if (PermissionService.isAllowToView(ROUTES.MAIN_PAYMENTS)) {
    return ROUTES.MAIN_PAYMENTS;
  }

  if (PermissionService.isAllowToView(ROUTES.MAIN_EXPENSES)) {
    return ROUTES.MAIN_EXPENSES;
  }

  return ROUTES.MAIN_MORE;
};
