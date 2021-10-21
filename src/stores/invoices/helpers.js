import t from 'locales/use-translation';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';
import {INVOICE_ACTIONS} from './types';

export const EDIT_INVOICE_ACTIONS = (
  sentStatus = false,
  completeStatus = false,
  isAllowToDelete
) => {
  let options = [];

  !sentStatus &&
    !completeStatus &&
    options.push(
      {
        label: t('invoices.actions.sendInvoice'),
        value: INVOICE_ACTIONS.SEND
      },
      {
        label: t('invoices.actions.markAsSent'),
        value: INVOICE_ACTIONS.MARK_AS_SENT
      }
    );

  sentStatus &&
    options.push({
      label: t('invoices.actions.reSendInvoice'),
      value: INVOICE_ACTIONS.SEND
    });

  options.push({
    label: t('invoices.actions.clone'),
    value: INVOICE_ACTIONS.CLONE
  });

  (sentStatus || (!sentStatus && !completeStatus)) &&
    options.push({
      label: t('invoices.actions.recordPayment'),
      value: INVOICE_ACTIONS.RECORD_PAYMENT
    });

  isAllowToDelete &&
    options.push({
      label: t('invoices.actions.delete'),
      value: INVOICE_ACTIONS.DELETE
    });

  if (!PermissionService.isAllowToSend(routes.INVOICE)) {
    options = options.filter(o => o.value !== INVOICE_ACTIONS.SEND);
  }

  return options;
};
