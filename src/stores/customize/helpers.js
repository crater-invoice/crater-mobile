import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

export const CUSTOMIZES_MENU = [
  {
    title: t('header.invoices'),
    fullItem: {route: routes.CUSTOMIZE_INVOICE},
    show: PermissionService.isSuperAdmin()
  },
  {
    title: t('header.estimates'),
    fullItem: {route: routes.CUSTOMIZE_ESTIMATE},
    show: PermissionService.isSuperAdmin()
  },
  {
    title: t('header.payments'),
    fullItem: {route: routes.CUSTOMIZE_PAYMENT},
    show: PermissionService.isAllowToView(routes.MAIN_PAYMENTS)
  },
  {
    title: t('header.items'),
    fullItem: {route: routes.ITEM_UNITS},
    show: PermissionService.isAllowToView(routes.GLOBAL_ITEMS)
  }
];

export const NUMBERING_SCHEME_TYPE = [
  {
    label: t('customizes.numberingScheme.customer_level'),
    value: 'customer_level'
  },
  {label: t('customizes.numberingScheme.company_level'), value: 'company_level'}
];
