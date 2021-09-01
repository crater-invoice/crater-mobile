import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as PreferencesAction from '../../actions';
import { LanguageAndCurrency } from '../../components/LanguageAndCurrency';
import { validate } from './validation';
import { EDIT_LANGUAGE_AND_CURRENCY } from '../../constants';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => {
    const {
        settings: {
            loading: {
                getPreferencesLoading,
                editPreferencesLoading,
                generalSettingsLoading
            },
            preferences
        }
    } = state;
    let isLoading =
        getPreferencesLoading ||
        typeof preferences === 'undefined' ||
        preferences === null;

    return {
        isLoading,
        currencies: state.common?.currencies,
        editPreferencesLoading,
        generalSettingsLoading,
        formValues: getFormValues(EDIT_LANGUAGE_AND_CURRENCY)(state) || {},
        ...commonSelector(state)
    };
};

const mapDispatchToProps = {
    getPreferences: PreferencesAction.getPreferences,
    editPreferences: PreferencesAction.editPreferences,
    clearPreferences: PreferencesAction.clearPreferences,
    getGeneralSetting: PreferencesAction.getGeneralSetting
};

const LanguageandCurrencyReduxForm = reduxForm({
    form: EDIT_LANGUAGE_AND_CURRENCY,
    validate
})(LanguageAndCurrency);

const LanguageAndCurrencyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageandCurrencyReduxForm);

LanguageAndCurrencyContainer.navigationOptions = () => ({
    header: null
});

export default LanguageAndCurrencyContainer;
