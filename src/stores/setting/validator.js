import {getError} from '@/validator';

export const validateNotification = values => {
  const errors = {};
  const {notification_email} = values;

  errors.notification_email = getError(notification_email, [
    'required',
    'emailFormat'
  ]);

  return errors;
};
