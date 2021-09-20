import {connect} from 'react-redux';
import {Settings} from '../../components/Settings';
import {reduxForm} from 'redux-form';
import {SETTINGS_SEARCH} from '../../constants';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state)
});

const settingSearchReduxForm = reduxForm({
  form: SETTINGS_SEARCH
})(Settings);

const SettingContainer = connect(mapStateToProps)(settingSearchReduxForm);

export default SettingContainer;
