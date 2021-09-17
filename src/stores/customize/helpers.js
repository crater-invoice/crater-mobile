import {ROUTES} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

// Customize Menu
// -----------------------------------------
export const CUSTOMIZES_MENU = () => {
  const list = [
    {
      title: t('header.invoices'),
      fullItem: {
        route: ROUTES.CUSTOMIZE_INVOICE
      }
    },
    {
      title: t('header.estimates'),
      fullItem: {
        route: ROUTES.CUSTOMIZE_ESTIMATE
      }
    },
    {
      title: t('header.payments'),
      fullItem: {
        route: ROUTES.CUSTOMIZE_PAYMENT
      }
    }
  ];
  PermissionService.isAllowToView(ROUTES.ITEM_UNITS) &&
    list.push({
      title: t('header.items'),
      fullItem: {
        route: ROUTES.ITEM_UNITS
      }
    });
  return list;
};

export const NUMBERING_SCHEME_TYPE = [
  {
    label: t('customizes.numberingScheme.customer_level'),
    value: 'customer_level'
  },
  {label: t('customizes.numberingScheme.company_level'), value: 'company_level'}
];
