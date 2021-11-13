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

export const initialValues = {
  attachment_receipt: null,
  expense_date: moment(),
  amount: null,
  expense_category_id: null,
  customer_id: null,
  notes: null
};
