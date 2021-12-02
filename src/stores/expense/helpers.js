import t from 'locales/use-translation';
import moment from 'moment';

export const ACTIONS_VALUE = {
  REMOVE: 'remove',
  DOWNLOAD: 'download'
};

export const EXPENSE_ACTIONS = (imageUrl = '', isAllowToDelete) => {
  const options = [];

  imageUrl &&
    options.push({
      label: t('expenses.view_receipt'),
      value: ACTIONS_VALUE.DOWNLOAD
    });

  isAllowToDelete &&
    options.push({
      label: t('expenses.remove_expense'),
      value: ACTIONS_VALUE.REMOVE
    });

  return options;
};
