import {createSelector} from 'reselect';
import {capitalize, isEmpty} from '@/constants';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';

const paymentStore = state => state?.payment;

export const paymentsSelector = createSelector(
  paymentStore,
  store => {
    if (isEmpty(store?.payments)) return [];
    return store.payments.map(payment => {
      const {
        formatted_payment_date,
        amount,
        payment_number,
        customer,
        currency
      } = payment;

      return {
        title: customer?.name ?? '',
        subtitle: {title: payment_number ?? ''},
        amount,
        currency,
        rightSubtitle: formatted_payment_date,
        fullItem: payment
      };
    });
  }
);

const formattedInvoice = (paymentInvoices, paymentInvoiceId, theme) => {
  if (isEmpty(paymentInvoices)) return [];
  return paymentInvoices.map(invoice => {
    const {
      status,
      invoice_number,
      formatted_due_date,
      due_amount,
      total,
      customer,
      id
    } = invoice;

    if (due_amount > 0 || id === paymentInvoiceId) {
      return {
        title: customer?.name,
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
        currency: customer?.currency,
        rightSubtitle: formatted_due_date,
        fullItem: invoice
      };
    }
  });
};

export const paymentInvoicesSelector = (invoices, paymentInvoiceId, theme) =>
  formattedInvoice(invoices, paymentInvoiceId, theme);

export const loadingSelector = createSelector(
  paymentStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
