import {createSelector} from 'reselect';
import {capitalize, isEmpty} from '@/constants';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';

export const formattedInvoices = (invoices, theme) => {
  if (isEmpty(invoices)) {
    return [];
  }

  return invoices.map(item => {
    const {
      invoice_number,
      user: {name, currency} = {},
      status,
      formattedInvoiceDate,
      total
    } = item;

    return {
      title: name,
      subtitle: {
        title: invoice_number,
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
      amount: total,
      currency,
      rightSubtitle: formattedInvoiceDate,
      fullItem: item
    };
  });
};
export const formatItems = (invoices, theme) => {
  if (isEmpty(invoices)) {
    return [];
  }

  return invoices.map(item => {
    const {status, total, customer: {name, currency} = {}} = item;

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
      amount: total,
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

export const statusSelector = statusList => {
  if (isEmpty(statusList)) {
    return [];
  }

  return statusList.map((status, id) => {
    return {
      id,
      title: status,
      fullItem: status
    };
  });
};

export const itemsSelector = items => {
  if (isEmpty(items)) {
    return [];
  }

  return items.map(item => {
    let {name, description, price} = item;

    return {
      title: name,
      subtitle: {title: description},
      amount: price,
      fullItem: item
    };
  });
};
