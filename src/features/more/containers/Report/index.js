import {connect} from 'react-redux';
import {Report} from '../../components/Report';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as MoreAction from '../../actions';
import {REPORT_FORM, DATE_RANGE} from '../../constants';
import {commonSelector} from 'stores/common/selectors';
import {currentCompanySelector} from 'stores/company/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    more: {loading},
    common: {fiscalYear = '2-1'}
  } = state;

  const type = route?.params?.type;

  const isLoading = loading.reportsLoading || !type;

  return {
    loading: isLoading,
    formValues: getFormValues(REPORT_FORM)(state) || {},
    type,
    fiscalYear,
    selectedCompany: currentCompanySelector(state),
    ...commonSelector(state),
    initialValues: !isLoading && {
      date_range: DATE_RANGE.THIS_MONTH,
      report_type: 'byCustomer'
    }
  };
};

const mapDispatchToProps = {
  generateReport: MoreAction.generateReport
};

const ReportReduxForm = reduxForm({
  form: REPORT_FORM,
  validate
})(Report);

const ReportContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportReduxForm);

export default ReportContainer;
