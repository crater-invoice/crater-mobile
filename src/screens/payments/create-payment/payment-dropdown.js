import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import {alertMe} from '@/constants';
import {removePayment} from 'stores/payment/actions';

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
    onSelect: action => onSelect(action, data),
    cancelButtonIndex: options.length,
    destructiveButtonIndex: options.length - 1,
    ...(!isAllowToDelete && {
      destructiveButtonIndex: options.length + 1
    })
  };
};

const ACTIONS_VALUE = {
  SEND: 'send',
  REMOVE: 'remove'
};

const onSelect = (action, data) => {
  const {
    sendMailRef,
    props: {dispatch, id}
  } = data;

  switch (action) {
    case ACTIONS_VALUE.REMOVE:
      alertMe({
        title: t('alert.title'),
        desc: t('payments.alert_description'),
        showCancel: true,
        okPress: () => dispatch(removePayment(id))
      });
      break;

    case ACTIONS_VALUE.SEND:
      sendMailRef?.openModal?.();
      break;

    default:
      break;
  }
};

const getOptions = () => {
  const options = [];

  if (PermissionService.isAllowToSend(routes.CREATE_PAYMENT)) {
    options.push({
      label: t('payments.send_receipt'),
      value: ACTIONS_VALUE.SEND
    });
  }

  if (PermissionService.isAllowToDelete(routes.CREATE_PAYMENT)) {
    options.push({
      label: t('payments.remove_payment'),
      value: ACTIONS_VALUE.REMOVE
    });
  }

  return options;
};
