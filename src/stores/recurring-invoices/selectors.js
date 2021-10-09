import {createSelector} from 'reselect';
import {capitalize, isEmpty} from '@/constants';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';

const formatItems = (invoices, theme) => {
  if (isEmpty(invoices)) {
    return [];
  }

  return invoices.map(item => {
    const {status, customer: {name, currency} = {}} = item;

    return {
      title: name,
      subtitle: {
        labelTextColor: BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode],
        ...(theme.mode === 'dark'
          ? {
              label: capitalize(status),
              labelOutlineColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
            }
          : {
              label: status,
              labelBgColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
            })
      },
      amount: '$0',
      currency,
      fullItem: item
    };
  });
};

export const loadingSelector = createSelector(
  state => state?.recurringInvoices,
  recurringInvoices => ({
    isSaving: recurringInvoices?.isSaving,
    isDeleting: recurringInvoices?.isDeleting
  })
);

export const invoicesSelector = createSelector(
  [state => state?.recurringInvoices?.invoices, state => state.common?.theme],
  (invoices, theme) => formatItems(invoices, theme)
);
