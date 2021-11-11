import {connect} from 'react-redux';
import Estimates from './list-estimates';
import {reduxForm, getFormValues} from 'redux-form';
import {ESTIMATES_FORM} from 'stores/estimate/types';
import {commonSelector} from 'stores/common/selectors';
import {estimateSelector, loadingSelector} from 'stores/estimate/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';

const mapStateToProps = state => ({
  customers: customersSelector(state),
  estimates: estimateSelector(state),
  formValues: getFormValues(ESTIMATES_FORM)(state) || {},
  ...loadingSelector(state),
  ...commonSelector(state)
});

const mapDispatchToProps = {
  fetchCustomers
};

const EstimatesForm = reduxForm({form: ESTIMATES_FORM})(Estimates);

export const EstimatesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EstimatesForm);
