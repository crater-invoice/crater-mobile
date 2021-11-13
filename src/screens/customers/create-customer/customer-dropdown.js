import t from 'locales/use-translation';
import {find} from 'lodash';
import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import {alertMe} from '@/constants';
import {removeCustomer} from 'stores/customer/actions';

export default data => {
  const {props, state} = data;
  const {isEditScreen, isAllowToDelete} = props;
  const {isFetchingInitialData} = state;

  if (isFetchingInitialData || !isEditScreen) {
    return null;
  }

  const options = getOptions();

  return {
    options: options,
    onSelect: action => onSelect(action, props),
    cancelButtonIndex: options.length,
    destructiveButtonIndex: options.length - 1,
    ...(!isAllowToDelete && {
      destructiveButtonIndex: options.length + 1
    })
  };
};

const ACTIONS_VALUE = {
  REMOVE: 'remove',
  CREATE_ESTIMATE: 'CREATE_ESTIMATE',
  CREATE_INVOICE: 'CREATE_INVOICE',
  CREATE_PAYMENT: 'CREATE_PAYMENT',
  CREATE_EXPENSE: 'CREATE_EXPENSE'
};

const onSelect = (action, props) => {
  const {navigation, formValues, id, currencies} = props;
  const currency = find(currencies, {fullItem: {id: formValues.currency_id}})
    .fullItem;
  const customer = {...formValues, currency, id};

  switch (action) {
    case ACTIONS_VALUE.REMOVE:
      const {id, dispatch} = props;

      alertMe({
        title: t('alert.title'),
        desc: t('customers.alert_description'),
        showCancel: true,
        okPress: () => dispatch(removeCustomer(id))
      });
      break;

    case ACTIONS_VALUE.CREATE_ESTIMATE:
      navigation.navigate(routes.CREATE_ESTIMATE, {type: 'ADD', customer});
      break;

    case ACTIONS_VALUE.CREATE_INVOICE:
      navigation.navigate(routes.CREATE_INVOICE, {type: 'ADD', customer});
      break;

    case ACTIONS_VALUE.CREATE_PAYMENT:
      navigation.navigate(routes.CREATE_PAYMENT, {type: 'ADD', customer});
      break;

    case ACTIONS_VALUE.CREATE_EXPENSE:
      navigation.navigate(routes.CREATE_EXPENSE, {type: 'ADD', customer});
      break;

    default:
      break;
  }
};

const getOptions = () => {
  const options = [];

  if (PermissionService.isAllowToCreate(routes.ESTIMATES)) {
    options.push({
      label: t('actions.new_estimate'),
      value: ACTIONS_VALUE.CREATE_ESTIMATE
    });
  }

  if (PermissionService.isAllowToCreate(routes.MAIN_INVOICES)) {
    options.push({
      label: t('actions.new_invoice'),
      value: ACTIONS_VALUE.CREATE_INVOICE
    });
  }

  if (PermissionService.isAllowToCreate(routes.MAIN_PAYMENTS)) {
    options.push({
      label: t('actions.new_payment'),
      value: ACTIONS_VALUE.CREATE_PAYMENT
    });
  }

  if (PermissionService.isAllowToCreate(routes.MAIN_EXPENSES)) {
    options.push({
      label: t('actions.new_expense'),
      value: ACTIONS_VALUE.CREATE_EXPENSE
    });
  }

  if (PermissionService.isAllowToDelete(routes.CREATE_CUSTOMER)) {
    options.push({
      label: t('customers.remove_customer'),
      value: ACTIONS_VALUE.REMOVE
    });
  }

  return options;
};
