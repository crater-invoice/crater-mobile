import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { EDIT_PREFERENCES } from '../../constants';
import * as PreferencesAction from '../../actions';
import { validate } from './validation';
import { Preferences } from '../../components/Preferences';

const mapStateToProps = state => {
    const {
        settings: {
            loading: {
                getPreferencesLoading,
                editPreferencesLoading,
                getSettingItemLoading,
                editSettingItemLoading,
            },
            preferences
        },
        global: { locale, currencies }
    } = state;

    let isLoading =
        getPreferencesLoading ||
        typeof preferences === 'undefined' ||
        preferences === null ||
        getSettingItemLoading;

    return {
        locale,
        isLoading,
        currencies,
        editPreferencesLoading,
        editSettingItemLoading,
        formValues: getFormValues(EDIT_PREFERENCES)(state) || {}
    };
};

const mapDispatchToProps = {
    getPreferences: PreferencesAction.getPreferences,
    editPreferences: PreferencesAction.editPreferences,
    clearPreferences: PreferencesAction.clearPreferences,
    getSettingItem: PreferencesAction.getSettingItem,
    editSettingItem: PreferencesAction.editSettingItem,
    getGeneralSetting: PreferencesAction.getGeneralSetting,
};

//  Redux Forms
const PreferencesReduxForm = reduxForm({
    form: EDIT_PREFERENCES,
    validate
})(Preferences);

//  connect
const PreferencesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreferencesReduxForm);

PreferencesContainer.navigationOptions = () => ({
    header: null
});

export default PreferencesContainer;
