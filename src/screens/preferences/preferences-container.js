import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import Preferences from './preferences';
import {PREFERENCES_FORM} from '@/stores/company/types';
import {validate} from '@/stores/company/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {
  getTimeZoneList,
  getFiscalYearList,
  getDateFormatList,
  getRetrospectiveEditsList,
  getCurrenciesList,
  getLanguagesList
} from 'stores/company/selectors';
import {editSettingItem} from '@/features/settings/actions';

const mapStateToProps = (state, {navigation}) => {
  const {
    company: {
      languages,
      time_zones,
      date_formats,
      fiscal_years,
      retrospective_edits,
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
    currencyList: getCurrenciesList(state.common?.currencies),
    languagesList: getLanguagesList(languages),
    timezoneList: getTimeZoneList(time_zones),
    dateFormatList: getDateFormatList(date_formats),
    fiscalYearLst: getFiscalYearList(fiscal_years),
    retrospectiveEditsList: getRetrospectiveEditsList(retrospective_edits),
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
