import {connect} from 'react-redux';
import CreateEstimate from './create-estimate';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_ESTIMATE_FORM} from 'stores/estimates/types';
import {validate} from 'stores/estimates/validator';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes, getNotes} from '@/features/settings/actions';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {loadingSelector} from 'stores/estimates/selectors';
import {initialValues} from 'stores/estimates/helpers';
import {currentCurrencySelector} from 'stores/company/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {taxTypes},
    settings: {notes, customFields},
    estimates: {selectedItems, estimateData},
    items: {items},
    customers: {customers}
  } = state;

  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...settingsSelector(state),
    ...permissionSelector(route),
    selectedItems,
    estimateData,
    items,
    notes,
    customers,
    taxTypes,
    currency: currentCurrencySelector(state),
    customFields,
    formValues: getFormValues(CREATE_ESTIMATE_FORM)(state) || {},
    initialValues
  };
};

const mapDispatchToProps = {
  getCustomers,
  getTaxes,
  getNotes
};

const CreateEstimateReduxForm = reduxForm({
  form: CREATE_ESTIMATE_FORM,
  validate
})(CreateEstimate);

export const CreateEstimateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEstimateReduxForm);
