import {createSelector} from 'reselect';
import {capitalize, isEmpty} from '@/constants';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';
import t from 'locales/use-translation';

export const formattedInvoices = (invoices, theme) => {
  if (isEmpty(invoices)) {
    return [];
  }

  return invoices.map(item => {
    const {
      invoice_number,
      customer: {name, currency} = {},
      status,
      formatted_invoice_date,
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
      rightSubtitle: formatted_invoice_date,
      fullItem: item
    };
  });
};

export const formatItems = (invoices, theme) => {
  if (isEmpty(invoices)) {
    return [];
  }

  return invoices.map(item => {
    const {
      status,
      total,
      formatted_created_at,
      customer: {name, currency} = {}
    } = item;

    return {
      title: name,
      subtitle: {
        ...(theme.mode === 'dark'
          ? {
              label: status,
              labelTextColor: BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode],
              labelOutlineColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
            }
          : {
              label: status,
              labelTextColor: BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode],
              labelBgColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
            })
      },
      amount: total,
      currency,
      rightSubtitle: formatted_created_at,
      fullItem: item
    };
  });
};

export const loadingSelector = createSelector(
  state => state?.recurringInvoice,
  store => ({
    isSaving: store?.isSaving,
    isDeleting: store?.isDeleting
  })
);

export const invoicesSelector = createSelector(
  [state => state?.recurringInvoice?.invoices, state => state.common?.theme],
  (invoices, theme) => formatItems(invoices, theme)
);

export const statusSelector = statusList => {
  if (isEmpty(statusList)) {
    return [];
  }

  return statusList.map(status => {
    return {
      ...status,
      label: t(status.key),
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
