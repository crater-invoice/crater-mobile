import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

// Customize Menu
// -----------------------------------------
export const CUSTOMIZES_MENU = () => {
  const list = [
    {
      title: t('header.invoices'),
      fullItem: {
        route: routes.CUSTOMIZE_INVOICE
      }
    },
    {
      title: t('header.estimates'),
      fullItem: {
        route: routes.CUSTOMIZE_ESTIMATE
      }
    },
    {
      title: t('header.payments'),
      fullItem: {
        route: routes.CUSTOMIZE_PAYMENT
      }
    }
  ];
  PermissionService.isAllowToView(routes.ITEM_UNITS) &&
    list.push({
      title: t('header.items'),
      fullItem: {
        route: routes.ITEM_UNITS
      }
    });
  return list;
};
