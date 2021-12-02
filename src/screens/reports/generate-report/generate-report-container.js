import {connect} from 'react-redux';
import GenerateReport from './generate-report';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from 'stores/report/validation';
import {GENERATE_REPORT_FORM} from 'stores/report/types';
import {DATE_RANGE} from 'stores/report/helpers';
import {commonSelector} from 'stores/common/selectors';
import {currentCompanySelector} from 'stores/company/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {fiscalYear = '2-1'}
  } = state;
  const type = route?.params?.type;

  return {
    formValues: getFormValues(GENERATE_REPORT_FORM)(state) || {},
    type,
    fiscalYear,
    selectedCompany: currentCompanySelector(state),
    ...commonSelector(state),
    initialValues: {
      date_range: DATE_RANGE.THIS_MONTH,
      report_type: 'by_customer'
    }
  };
};

const GenerateReportForm = reduxForm({
  form: GENERATE_REPORT_FORM,
  validate
})(GenerateReport);

export const GenerateReportContainer = connect(mapStateToProps)(
  GenerateReportForm
);
