import t from 'locales/use-translation';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';
import {
  ESTIMATE_ACTIONS,
  MARK_AS_ACCEPT,
  MARK_AS_REJECT,
  MARK_AS_SENT
} from './types';
import moment from 'moment';

export const EDIT_ESTIMATE_ACTIONS = (markAs = '', isAllowToDelete) => {
  const markAsSent = [
    {
      label: t('estimates.actions.markAsSent'),
      value: ESTIMATE_ACTIONS.MARK_AS_SENT
    }
  ];

  const markAsAccept = [
    {
      label: t('estimates.actions.markAsAccepted'),
      value: ESTIMATE_ACTIONS.MARK_AS_ACCEPTED
    }
  ];

  const markAsReject = [
    {
      label: t('estimates.actions.markAsRejected'),
      value: ESTIMATE_ACTIONS.MARK_AS_REJECTED
    }
  ];

  const deleteAction = [
    {
      label: t('estimates.actions.delete'),
      value: ESTIMATE_ACTIONS.DELETE
    }
  ];

  const sendEstimate = {
    label: t(
      markAs === MARK_AS_SENT
        ? 'estimates.actions.reSendEstimate'
        : 'estimates.actions.sendEstimate'
    ),
    value: ESTIMATE_ACTIONS.SEND
  };

  let actions = [];

  if (PermissionService.isAllowToView(routes.MAIN_INVOICES)) {
    actions.push({
      label: t('estimates.actions.convertToInvoice'),
      value: ESTIMATE_ACTIONS.CONVERT_TO_INVOICE
    });
  }

  if (PermissionService.isAllowToSend(routes.CREATE_ESTIMATE)) {
    actions = [...actions, sendEstimate];
  }

  let items = [];

  if (markAs === MARK_AS_SENT) {
    items = [...markAsAccept, ...markAsReject];
  } else if (markAs === MARK_AS_ACCEPT) {
    items = [...markAsSent, ...markAsReject];
  } else if (markAs === MARK_AS_REJECT) {
    items = [...markAsSent, ...markAsAccept];
  } else {
    items = [...markAsSent, ...markAsAccept, ...markAsReject];
  }

  return isAllowToDelete
    ? [...actions, ...items, ...deleteAction]
    : [...actions, ...items];
};

export const initialValues = templates => {
  return {
    expiry_date: moment().add(7, 'days'),
    estimate_date: moment(),
    discount_type: 'fixed',
    discount: 0,
    taxes: [],
    template_name: templates ? templates?.[0]?.name : null,
    notes: null,
    estimate_number: null,
    prefix: null,
    customer_id: null
  };
};
