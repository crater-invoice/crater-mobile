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
