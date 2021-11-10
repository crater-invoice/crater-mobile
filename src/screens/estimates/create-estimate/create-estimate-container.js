import {connect} from 'react-redux';
import CreateEstimate from './create-estimate';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_ESTIMATE_FORM} from 'stores/estimates/types';
import {validate} from 'stores/estimates/validator';
import {getItems} from '@/features/more/actions';
import {loadingSelector} from 'stores/estimates/selectors';
import {initialValues} from 'stores/estimates/helpers';
import {currentCurrencySelector} from 'stores/company/selectors';
import {fetchNotes} from 'stores/notes/actions';
import {notesSelector} from 'stores/notes/selectors';
import {taxTypesSelector} from 'stores/taxes/selectors';
import {fetchTaxes} from 'stores/taxes/actions';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {customersSelector} from 'stores/customers/selectors';
import {fetchCustomers} from 'stores/customers/actions';

const mapStateToProps = (state, {route}) => {
  const {
    settings: {customFields},
    estimates: {selectedItems, estimateData},
    more: {items}
  } = state;

  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...settingsSelector(state),
    ...permissionSelector(route),
    selectedItems,
    estimateData,
    items,
    notes: notesSelector(state),
    customers: customersSelector(state),
    taxTypes: taxTypesSelector(state),
    currency: currentCurrencySelector(state),
    customFields,
    formValues: getFormValues(CREATE_ESTIMATE_FORM)(state) || {},
    initialValues
  };
};

const mapDispatchToProps = {
  fetchCustomers,
  fetchTaxes,
  fetchNotes,
  getItems
};

const CreateEstimateReduxForm = reduxForm({
  form: CREATE_ESTIMATE_FORM,
  validate
})(CreateEstimate);

export const CreateEstimateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEstimateReduxForm);
