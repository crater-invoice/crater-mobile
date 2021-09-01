import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { EDIT_PREFERENCES } from '../../constants';
import * as PreferencesAction from '../../actions';
import { validate } from './validation';
import { Preferences } from '../../components/Preferences';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => {
    const {
        settings: {
            loading: {
                getPreferencesLoading,
                editPreferencesLoading,
                getSettingItemLoading,
                editSettingItemLoading
            },
            preferences
        }
    } = state;

    let isLoading =
        getPreferencesLoading ||
        typeof preferences === 'undefined' ||
        preferences === null ||
        getSettingItemLoading;

    return {
        isLoading,
        currencies: state.common?.currencies,
        editPreferencesLoading,
        editSettingItemLoading,
        ...commonSelector(state),
        formValues: getFormValues(EDIT_PREFERENCES)(state) || {}
    };
};

const mapDispatchToProps = {
    getPreferences: PreferencesAction.getPreferences,
    editPreferences: PreferencesAction.editPreferences,
    clearPreferences: PreferencesAction.clearPreferences,
    getSettingItem: PreferencesAction.getSettingItem,
    editSettingItem: PreferencesAction.editSettingItem,
    getGeneralSetting: PreferencesAction.getGeneralSetting
};

const PreferencesReduxForm = reduxForm({
    form: EDIT_PREFERENCES,
    validate
})(Preferences);

const PreferencesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreferencesReduxForm);

PreferencesContainer.navigationOptions = () => ({
    header: null
});

export default PreferencesContainer;
