import t from 'locales/use-translation';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';
import {INVOICE_ACTIONS} from './types';
import moment from 'moment';

export const EDIT_INVOICE_ACTIONS = (
  sentStatus = false,
  completeStatus = false,
  isAllowToEdit,
  isAllowToDelete
) => {
  let options = [];

  !sentStatus &&
    !completeStatus &&
    options.push(
      {
        label: t('invoices.actions.send_invoice'),
        value: INVOICE_ACTIONS.SEND
      },
      {
        label: t('invoices.actions.mark_as_sent'),
        value: INVOICE_ACTIONS.MARK_AS_SENT
      }
    );

  sentStatus &&
    options.push({
      label: t('invoices.actions.resend_invoice'),
      value: INVOICE_ACTIONS.SEND
    });

  if (PermissionService.isOwner) {
    options.push({
      label: t('invoices.actions.clone'),
      value: INVOICE_ACTIONS.CLONE
    });
  }

  if (
    PermissionService.isAllowToCreate(routes.MAIN_PAYMENTS) &&
    (sentStatus || (!sentStatus && !completeStatus))
  ) {
    options.push({
      label: t('invoices.actions.record_payment'),
      value: INVOICE_ACTIONS.RECORD_PAYMENT
    });
  }

  isAllowToDelete &&
    options.push({
      label: t('invoices.actions.delete'),
      value: INVOICE_ACTIONS.DELETE
    });

  if (!PermissionService.isAllowToSend(routes.CREATE_INVOICE)) {
    options = options.filter(
      o =>
        o.value !== INVOICE_ACTIONS.SEND &&
        o.value !== INVOICE_ACTIONS.MARK_AS_SENT
    );
  }

  return options;
};

export const initialValues = templates => {
  return {
    due_date: moment().add(7, 'days'),
    invoice_date: moment(),
    discount_type: 'fixed',
    discount: 0,
    taxes: [],
    template_name: templates ? templates?.[0]?.name : null,
    notes: null,
    invoice_number: null,
    customer_id: null
  };
};

export const isAllowToEditInvoice = (route, isEditScreen, hasEditAbility) => {
  const allow_edit = route?.params?.allow_edit;

  if (!isEditScreen) {
    return true;
  }

  if (!hasEditAbility) {
    return false;
  }

  if (!allow_edit) {
    return false;
  }

  return true;
};
