import {connect} from 'react-redux';
import CreateEstimate from './create-estimate';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_ESTIMATE_FORM} from 'stores/estimates/types';
import {validate} from 'stores/estimates/validator';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes} from '@/features/settings/actions';
import {getItems} from '@/features/more/actions';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {loadingSelector} from 'stores/estimates/selectors';
import {initialValues} from 'stores/estimates/helpers';
import {currentCurrencySelector} from 'stores/company/selectors';
import {fetchNotes} from 'stores/notes/actions';
import {notesSelector} from 'stores/notes/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {taxTypes},
    settings: {customFields},
    estimates: {selectedItems, estimateData},
    more: {items},
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
    notes: notesSelector(state),
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
