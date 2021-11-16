import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import Preferences from './preferences';
import {PREFERENCES_FORM} from 'stores/company/types';
import {validate} from 'stores/company/validator';
import {commonSelector} from 'stores/common/selectors';
import {
  timeZonesSelector,
  fiscalYearsSelector,
  dateFormatsSelector,
  currenciesSelector,
  languagesSelector,
  loadingSelector
} from 'stores/company/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state),
  ...loadingSelector(state),
  formValues: getFormValues(PREFERENCES_FORM)(state) || {},
  currencies: currenciesSelector(state),
  languages: languagesSelector(state),
  timezones: timeZonesSelector(state),
  dateFormats: dateFormatsSelector(state),
  fiscalYears: fiscalYearsSelector(state),
  initialValues: {
    carbon_date_format: null,
    moment_date_format: null,
    date_format: null,
    time_zone: null,
    fiscal_year: null,
    discount_per_item: null,
    tax_per_item: null
  }
});

const PreferencesForm = reduxForm({form: PREFERENCES_FORM, validate})(
  Preferences
);

export default connect(mapStateToProps)(PreferencesForm);
