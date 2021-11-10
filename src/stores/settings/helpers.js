import {PercentageIcon} from '@/icons';
import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

export const SETTINGS_MENU = () => {
  return [
    {
      title: t('settings.account_settings'),
      leftIcon: 'user-circle',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.ACCOUNT_INFO},
      show: true
    },
    {
      title: t('settings.company_information'),
      leftIcon: 'building',
      leftIconSolid: true,
      iconSize: 17,
      fullItem: {route: routes.CREATE_COMPANY},
      show: PermissionService.isAllowToManage(routes.CREATE_COMPANY)
    },
    {
      title: t('settings.preference'),
      leftIcon: 'sun',
      leftIconSolid: true,
      iconSize: 21,
      fullItem: {route: routes.PREFERENCES},
      show: PermissionService.isSuperAdmin()
    },
    {
      title: t('settings.customize'),
      leftIcon: 'pen-square',
      leftIconSolid: true,
      iconSize: 21,
      fullItem: {
        route: routes.CUSTOMIZE_LIST
      },
      show:
        PermissionService.isAllowToView(routes.MAIN_PAYMENTS) ||
        PermissionService.isAllowToView(routes.ITEMS)
    },
    {
      title: t('settings.taxes'),
      leftIconSvg: PercentageIcon,
      leftIconSolid: true,
      iconSize: 17,
      fullItem: {route: routes.TAXES},
      show: PermissionService.isAllowToView(routes.TAXES)
    },
    {
      title: t('settings.notification'),
      leftIcon: 'bell',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.NOTIFICATIONS},
      show: PermissionService.isSuperAdmin()
    },
    {
      title: t('settings.notes'),
      leftIcon: 'clipboard-check',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.NOTES},
      show: PermissionService.isAllowToManage(routes.NOTES)
    },
    {
      title: t('header.roles'),
      leftIcon: 'users',
      iconSize: 20,
      fullItem: {route: routes.ROLES},
      show: PermissionService.isAllowToView(routes.ROLES)
    },
    {
      title: t('settings.touch_or_Face_id'),
      leftIcon: 'key',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.TOUCH_OR_FACE_ID},
      show: true
    },
    {
      title: t('settings.endpoint'),
      leftIcon: 'link',
      iconSize: 20,
      fullItem: {route: routes.ENDPOINTS_SETTINGS},
      show: PermissionService.isSuperAdmin()
    }
  ];
};
