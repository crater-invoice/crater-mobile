import {getError} from '@/constants';

export const validate = values => {
  const errors = {};
  const {notification_email} = values;

  errors.notification_email = getError(notification_email, [
    'required',
    'emailFormat'
  ]);

  return errors;
};
