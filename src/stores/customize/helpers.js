import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

export const CUSTOMIZES_MENU = () => {
  return [
    {
      title: t('header.invoices'),
      fullItem: {route: routes.CUSTOMIZE_INVOICE},
      show: true
    },
    {
      title: t('header.estimates'),
      fullItem: {route: routes.CUSTOMIZE_ESTIMATE},
      show: true
    },
    {
      title: t('header.payments'),
      fullItem: {route: routes.CUSTOMIZE_PAYMENT},
      show: true
    },
    {
      title: t('header.items'),
      fullItem: {route: routes.ITEM_UNITS},
      show: PermissionService.isAllowToView(routes.ITEM_UNITS)
    }
  ];
};

export const NUMBERING_SCHEME_TYPE = [
  {
    label: t('customizes.numberingScheme.customer_level'),
    value: 'customer_level'
  },
  {label: t('customizes.numberingScheme.company_level'), value: 'company_level'}
];
