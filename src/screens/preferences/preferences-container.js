import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import Preferences from './preferences';
import {PREFERENCES_FORM} from '@/stores/company/types';
import {validate} from '@/stores/company/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {
  timeZonesSelector,
  fiscalYearsSelector,
  dateFormatsSelector,
  retrospectiveEditsSelector,
  currenciesSelector,
  languagesSelector
} from 'stores/company/selectors';
import {editSettingItem} from '@/features/settings/actions';

const mapStateToProps = (state, {navigation}) => {
  const {
    company: {
      currencies,
      languages,
      timezones,
      dateFormats,
      fiscalYears,
      retrospectiveEdits,
      loading: {fetchPreferencesLoading, updatePreferencesLoading}
    }
  } = state;
  let isLoading = fetchPreferencesLoading || updatePreferencesLoading;
  return {
    ...commonSelector(state),
    ...permissionSelector(navigation),
    isLoading,
    formValues: getFormValues(PREFERENCES_FORM)(state) || {},
    updatePreferencesLoading: updatePreferencesLoading,
    currencies: currenciesSelector(currencies),
    languages: languagesSelector(languages),
    timezones: timeZonesSelector(timezones),
    dateFormats: dateFormatsSelector(dateFormats),
    fiscalYears: fiscalYearsSelector(fiscalYears),
    retrospectiveEdits: retrospectiveEditsSelector(retrospectiveEdits),
    initialValues: {
      carbon_date_format: null,
      moment_date_format: null,
      date_format: null,
      time_zone: null,
      fiscal_year: null,
      discount_per_item: null,
      tax_per_item: null
    }
  };
};

const mapDispatchToProps = {
  editSettingItem
};

const PreferencesForm = reduxForm({form: PREFERENCES_FORM, validate})(
  Preferences
);

export const PreferencesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferencesForm);

PreferencesContainer.navigationOptions = () => ({
  header: null
});
