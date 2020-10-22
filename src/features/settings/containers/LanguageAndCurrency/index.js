import React from 'react';
import { connect } from 'react-redux';
import { Company } from '../../components/Company';
import { reduxForm, getFormValues } from 'redux-form';
import * as PreferencesAction from '../../actions';
import { LanguageAndCurrency } from '../../components/LanguageAndCurrency';
import { validate } from './validation';
import { EDIT_LANGUAGE_AND_CURRENCY } from '../../constants';

const mapStateToProps = state => {
    const {
        settings: {
            loading: { 
                getPreferencesLoading, 
                editPreferencesLoading, 
                generalSettingsLoading 
            },
            preferences,
            currencies,
            Languages
        },
        global: { locale }
    } = state;

    let isLoading =
        getPreferencesLoading ||
        typeof preferences === 'undefined' ||
        preferences === null;

    return {
        locale,
        isLoading,
        currencies,
        Languages,
        editPreferencesLoading,
        generalSettingsLoading,
        formValues: getFormValues(EDIT_LANGUAGE_AND_CURRENCY)(state) || {},
    };
};

const mapDispatchToProps = {
    getPreferences: PreferencesAction.getPreferences,
    editPreferences: PreferencesAction.editPreferences,
    clearPreferences: PreferencesAction.clearPreferences,
    getGeneralSetting: PreferencesAction.getGeneralSetting,
};

//  Redux Forms
const LanguageandCurrencyReduxForm = reduxForm({
    form: EDIT_LANGUAGE_AND_CURRENCY,
    validate
})(LanguageAndCurrency);

//  connect
const LanguageAndCurrencyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageandCurrencyReduxForm);

LanguageAndCurrencyContainer.navigationOptions = () => ({
    header: null
});

export default LanguageAndCurrencyContainer;
