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

    default:
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

    if (hasObjectLength(errors)) {
      const {key, error} = requiredErrorMessage(errors);
      return {key, error};
    }

    if (error && typeof error === 'string' && error.includes('_attached')) {
      alreadyInUseErrorMessage(error);
    }
  } catch (e) {}
};
