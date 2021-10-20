import {connect} from 'react-redux';
import {find} from 'lodash';
import {Estimate} from '../../components/Estimate';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as actions from '../../actions';
import {ESTIMATE_FORM} from '../../constants';
import moment from 'moment';
import {getTaxes, getNotes} from '@/features/settings/actions';
import {isEmpty} from '@/constants';
import {getCustomers} from '@/features/customers/actions';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {getItems} from '@/features/more/actions';

const getSelectedTemplate = (templates, form, isEditScreen) => {
  if (!isEditScreen) {
    return templates?.[0]?.name;
  }

  if (form?.template_name) {
    return form?.template_name;
  }

  return find(templates, {id: form?.estimate_template_id})?.name;
};

const mapStateToProps = (state, {route}) => {
  const {
    common: {taxTypes, currency},
    estimates,
    estimates: {
      isFetchingInitialData,
      isSaving,
      isDeleting,
      selectedItems,
      estimateData
    },
    more: {items},
    customers: {customers},
    settings: {notes, customFields}
  } = state;

  const {
    estimate = null,
    estimateTemplates,
    estimate_notes = ''
  } = estimateData;

  const id = route?.params?.id;
  const permissions = permissionSelector(route);
  const isEditScreen = permissions.isEditScreen;

  const isLoading =
    isFetchingInitialData ||
    (isEditScreen && !estimate) ||
    isEmpty(estimateTemplates);

  return {
    isFetchingInitialData: isLoading,
    isSaving,
    withLoading: estimates.isLoading || isDeleting,
    selectedItems,
    estimateData,
    items,
    notes,
    customers,
    formValues: getFormValues(ESTIMATE_FORM)(state) || {},
    taxTypes,
    customFields,
    id,
    currency,
    ...permissions,
    ...commonSelector(state),
    ...settingsSelector(state),
    initialValues: !isLoading
      ? {
          expiry_date: moment().add(7, 'days'),
          estimate_date: moment(),
          discount_type: 'fixed',
          discount: 0,
          taxes: [],
          template_name: getSelectedTemplate(
            estimateTemplates,
            estimate,
            isEditScreen
          ),
          notes: estimate_notes,
          ...estimate,
          estimate_number: isEditScreen
            ? estimateData?.nextEstimateNumber
            : estimateData?.nextNumber,
          prefix: isEditScreen
            ? estimateData?.estimatePrefix
            : estimateData?.prefix,
          customer: estimate?.customer,
          template: estimate?.estimate_template
        }
      : null
  };
};

const mapDispatchToProps = {
  ...actions,
  getCustomers,
  getTaxes,
  getNotes,
  getItems
};

const addEstimateReduxForm = reduxForm({
  form: 'estimate/ESTIMATE_FORM',
  validate
})(Estimate);

const EstimateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(addEstimateReduxForm);

export default EstimateContainer;
