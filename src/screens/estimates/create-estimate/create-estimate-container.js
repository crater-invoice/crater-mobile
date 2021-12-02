import {connect} from 'react-redux';
import CreateEstimate from './create-estimate';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_ESTIMATE_FORM} from 'stores/estimate/types';
import {validate} from 'stores/estimate/validator';
import {loadingSelector, templatesSelector} from 'stores/estimate/selectors';
import {initialValues} from 'stores/estimate/helpers';
import {currentCurrencySelector} from 'stores/company/selectors';
import {fetchNotes} from 'stores/note/actions';
import {notesSelector} from 'stores/note/selectors';
import {taxTypesSelector} from 'stores/tax-type/selectors';
import {fetchTaxes} from 'stores/tax-type/actions';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    estimate: {selectedItems},
    item: {items}
  } = state;

  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...settingsSelector(state),
    ...permissionSelector(route),
    selectedItems,
    items,
    estimateTemplates: templatesSelector(state),
    notes: notesSelector(state),
    customers: customersSelector(state),
    taxTypes: taxTypesSelector(state),
    currency: currentCurrencySelector(state),
    customFields: customFieldsSelector(state),
    formValues: getFormValues(CREATE_ESTIMATE_FORM)(state) || {},
    initialValues: initialValues()
  };
};

const mapDispatchToProps = {
  fetchCustomers,
  fetchTaxes,
  fetchNotes
};

const CreateEstimateForm = reduxForm({
  form: CREATE_ESTIMATE_FORM,
  validate
})(CreateEstimate);

export const CreateEstimateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEstimateForm);
