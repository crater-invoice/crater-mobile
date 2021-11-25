import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

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
      show: PermissionService.isOwner
    },
    {
      title: t('more.reports'),
      leftIcon: 'signal',
      iconSize: 15,
      fullItem: {route: routes.REPORTS},
      show: PermissionService.isOwner
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
