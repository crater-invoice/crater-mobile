import { connect } from 'react-redux';
import { Settings } from '../../components/Settings';
import { reduxForm } from 'redux-form';
import { SETTINGS_SEARCH } from '../../constants';
import * as SettingAction from '../../actions';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    ...commonSelector(state)
});

const mapDispatchToProps = {
    logout: SettingAction.logout
};

const settingSearchReduxForm = reduxForm({
    form: SETTINGS_SEARCH
})(Settings);

const SettingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(settingSearchReduxForm);

SettingContainer.navigationOptions = () => ({
    header: null
});

export default SettingContainer;
