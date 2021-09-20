import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as CustomFieldAction from '../../actions';
import {CustomField} from '../../components/CustomField';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {
  CUSTOM_FIELD_FORM,
  CUSTOM_FIELDS as FIELDS,
  CUSTOM_FIELD_MODAL_TYPES as MODAL_TYPES,
  CUSTOM_FIELD_DATA_TYPE_LIST as DATA_TYPES
} from '../../constants';

const mapStateToProps = (state, {route}) => {
  const loading = state.settings?.loading ?? {};
  const {
    customFieldLoading,
    getCustomFieldLoading,
    removeCustomFieldLoading
  } = loading;

  const id = field?.id;
  const field = route?.params?.field;
  const permissions = permissionSelector(route);

  return {
    loading: customFieldLoading,
    getCustomFieldLoading,
    removeCustomFieldLoading,
    currency: state.common?.currency,
    id,
    field,
    formValues: getFormValues(CUSTOM_FIELD_FORM)(state) || {},
    ...permissions,
    ...commonSelector(state),
    initialValues: permissions.isCreateScreen
      ? {
          [FIELDS.FIELD]: {
            [FIELDS.IS_REQUIRED]: false,
            [FIELDS.MODAL_TYPE]: MODAL_TYPES[0].value,
            [FIELDS.TYPE]: DATA_TYPES[0].value,
            [FIELDS.OPTIONS]: [],
            [FIELDS.ORDER]: 1,
            [FIELDS.IS_REQUIRED]: false,
            [FIELDS.DEFAULT_VALUE]: null,
            [FIELDS.PLACEHOLDER]: null
          }
        }
      : {
          [FIELDS.FIELD]: {
            [FIELDS.IS_REQUIRED]: false,
            [FIELDS.DEFAULT_VALUE]: null,
            [FIELDS.PLACEHOLDER]: null,
            [FIELDS.OPTIONS]: [],
            [FIELDS.ORDER]: 1
          }
        }
  };
};

const mapDispatchToProps = {
  createCustomField: CustomFieldAction.createCustomField,
  getCustomField: CustomFieldAction.getCustomField,
  editCustomField: CustomFieldAction.editCustomField,
  removeCustomField: CustomFieldAction.removeCustomField
};

const customFieldForm = reduxForm({
  form: CUSTOM_FIELD_FORM,
  validate
})(CustomField);

const CustomFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(customFieldForm);

export default CustomFieldContainer;
