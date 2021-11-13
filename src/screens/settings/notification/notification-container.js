import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Notification from './notification';
import {commonSelector} from 'stores/common/selectors';
import {NOTIFICATION_FORM} from 'stores/setting/types';
import {validateNotification as validate} from 'stores/setting/validator';

const mapStateToProps = state => ({
  ...commonSelector(state)
});

const NotificationForm = reduxForm({
  form: NOTIFICATION_FORM,
  validate
})(Notification);

export const NotificationContainer = connect(mapStateToProps)(NotificationForm);
