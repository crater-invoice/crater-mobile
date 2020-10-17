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
            loading: { getPreferencesLoading, editPreferencesLoading },
            preferences
        },
        global: { locale, currencies }
    } = state;

    let isLoading =
        getPreferencesLoading ||
        typeof preferences === 'undefined' ||
        preferences === null;

    return {
        locale,
        isLoading,
        currencies,
        editPreferencesLoading,
        formValues: getFormValues(EDIT_LANGUAGE_AND_CURRENCY)(state) || {},
        initialValues: !isLoading
            ? {
                  currency: preferences.selectedCurrency,
                  language: preferences.selectedLanguage,
                  time_zone: preferences.time_zone,
                  date_format: preferences.carbon_date_format,
                  carbon_date_format: preferences.carbon_date_format,
                  moment_date_format: preferences.moment_date_format,
                  fiscal_year: preferences.fiscal_year
              }
            : null
    };
};

const mapDispatchToProps = {
    getPreferences: PreferencesAction.getPreferences,
    editPreferences: PreferencesAction.editPreferences,
    clearPreferences: PreferencesAction.clearPreferences
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
