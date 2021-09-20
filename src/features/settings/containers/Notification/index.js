import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {NOTIFICATION} from '../../constants';
import * as NotificationAction from '../../actions';
import {validate} from './validation';
import {Notification} from '../../components/Notification';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...state.settings?.loading,
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getSettingItem: NotificationAction.getSettingItem,
  editSettingItem: NotificationAction.editSettingItem
};

const NotificationReduxForm = reduxForm({
  form: NOTIFICATION,
  validate
})(Notification);

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationReduxForm);

export default NotificationContainer;
