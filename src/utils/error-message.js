import {hasObjectLength} from '@/constants';
import showNotification from 'utils/notification';

export const handleError = e => {
  try {
    const errors = e?.data?.errors;
    if (hasObjectLength(errors)) {
      const key = Object.keys(errors)?.[0];
      const error = Object.values(errors)?.[0]?.[0];
      error && showNotification({message: error, type: 'error'});
      return {key, error};
    }
  } catch (e) {}
};
