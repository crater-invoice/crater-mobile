import { hasLength } from '@/constants';
import { BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR } from '@/utils';
import { createSelector } from 'reselect';

const getDueInvoicesState = createSelector(
    [state => state.invoices, state => state.theme],
    (invoices, theme) => {
        return !hasLength(invoices)
            ? []
            : invoices.map(item => {
                  const {
                      invoice_number,
                      user: { name, currency } = {},
                      status,
                      formattedInvoiceDate,
                      total
                  } = item;

                  return {
                      title: name,
                      subtitle: {
                          title: invoice_number,
                          label: status,
                          labelBgColor:
                              BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
                          labelTextColor:
                              BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode]
                      },
                      amount: total,
                      currency,
                      rightSubtitle: formattedInvoiceDate,
                      fullItem: item
                  };
              });
    }
);

const getDraftInvoicesState = createSelector(
    [state => state.invoices, state => state.theme],
    (invoices, theme) => {
        return !hasLength(invoices)
            ? []
            : invoices.map(item => {
                  const {
                      invoice_number,
                      user: { name, currency } = {},
                      status,
                      formattedInvoiceDate,
                      total
                  } = item;

                  return {
                      title: name,
                      subtitle: {
                          title: invoice_number,
                          label: status,
                          labelBgColor:
                              BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
                          labelTextColor:
                              BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode]
                      },
                      amount: total,
                      currency,
                      rightSubtitle: formattedInvoiceDate,
                      fullItem: item
                  };
              });
    }
);

const getAllInvoicesState = createSelector(
    [state => state.invoices, state => state.theme],
    (invoices, theme) => {
        return !hasLength(invoices)
            ? []
            : invoices.map(item => {
                  const {
                      invoice_number,
                      user: { name, currency } = {},
                      status,
                      formattedInvoiceDate,
                      total
                  } = item;

                  return {
                      title: name,
                      subtitle: {
                          title: invoice_number,
                          label: status,
                          labelBgColor:
                              BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
                          labelTextColor:
                              BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode]
                      },
                      amount: total,
                      currency,
                      rightSubtitle: formattedInvoiceDate,
                      fullItem: item
                  };
              });
    }
);

export { getDueInvoicesState, getDraftInvoicesState, getAllInvoicesState };
