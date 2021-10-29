import {connect} from 'react-redux';
import Estimates from './list-estimates';
import {reduxForm, getFormValues} from 'redux-form';
import {ESTIMATES_FORM} from 'stores/estimates/types';
import {getCustomers} from '@/features/customers/actions';
import {commonSelector} from 'stores/common/selectors';
import {estimateSelector, loadingSelector} from 'stores/estimates/selectors';

const mapStateToProps = state => {
  const {
    customers: {customers}
  } = state;
  return {
    customers,
    estimates: estimateSelector(state),
    formValues: getFormValues(ESTIMATES_FORM)(state) || {},
    ...loadingSelector(state),
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getCustomers
};

const EstimatesForm = reduxForm({form: ESTIMATES_FORM})(Estimates);

export const EstimatesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EstimatesForm);
