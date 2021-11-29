import {hasObjectLength} from '@/constants';
import {showNotification} from './notification';
import t from 'locales/use-translation';

const alreadyInUseErrorMessage = error => {
  const type = error.split('_attached')?.[0];

  switch (type) {
    case 'expense':
      showNotification({
        message: t('notification.expense_already_in_use'),
        type: 'error'
      });
      break;

    case 'expense':
      showNotification({
        message: t('notification.expense_already_in_use'),
        type: 'error'
      });
      break;

    case 'values':
      showNotification({
        message: t('notification.custom_field_already_in_use'),
        type: 'error'
      });
      break;

    case 'taxes':
      showNotification({
        message: t('notification.tax_already_in_use'),
        type: 'error'
      });
      break;

    case 'payments':
      showNotification({
        message: t('notification.payment_mode_already_in_use'),
        type: 'error'
      });
      break;

    case 'items':
      showNotification({
        message: t('notification.item_unit_already_in_use'),
        type: 'error'
      });
      break;

    default:
      break;
  }
};

const customErrorMessage = message => {
  switch (message) {
    case 'total_invoice_amount_must_be_more_than_paid_amount':
      showNotification({
        message: t('notification.invalid_due_amount_message'),
        type: 'error'
      });
      break;

    default:
      showNotification({message, type: 'error'});
      break;
  }
};

const requiredErrorMessage = errors => {
  const key = Object.keys(errors)?.[0];
  const error = Object.values(errors)?.[0]?.[0];
  error && showNotification({message: error, type: 'error'});
  return {key, error};
};

export const handleError = e => {
  try {
    const error = e?.data?.error;
    const errors = e?.data?.errors;
    const message = e?.data?.message;

    if (hasObjectLength(errors)) {
      const {key, error} = requiredErrorMessage(errors);
      return {key, error};
    }

    if (error && typeof error === 'string' && error.includes('_attached')) {
      alreadyInUseErrorMessage(error);
      return;
    }

    if (error && typeof error === 'string') {
      customErrorMessage(error);
      return;
    }

    if (message) {
      showNotification({message, type: 'error'});
    }
  } catch (e) {}
};
