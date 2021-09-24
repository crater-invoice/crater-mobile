import {connect} from 'react-redux';
import {Estimates} from '../../components/Estimates';
import {reduxForm, getFormValues} from 'redux-form';
import * as EstimatesAction from '../../actions';
import {ESTIMATES_FORM} from '../../constants';
import {getCustomers} from '@/features/customers/actions';
import {commonSelector} from 'stores/common/selectors';
import {
  getDraftEstimatesState,
  getSentEstimatesState,
  getAllEstimatesState
} from '../../selectors';

const mapStateToProps = state => {
  const theme = state.common?.theme;
  const estimates = state.estimates?.estimates;
  return {
    estimates,
    draftEstimates: getDraftEstimatesState({estimates, theme}),
    sentEstimates: getSentEstimatesState({estimates, theme}),
    allEstimates: getAllEstimatesState({estimates, theme}),
    customers: state.customers?.customers,
    formValues: getFormValues(ESTIMATES_FORM)(state) || {},
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getEstimates: EstimatesAction.getEstimates,
  clearEstimates: EstimatesAction.clearEstimates,
  getCustomers: getCustomers
};

const estimateSearchReduxForm = reduxForm({
  form: 'estimate/ESTIMATES_FORM'
})(Estimates);

const EstimatesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(estimateSearchReduxForm);

export default EstimatesContainer;
