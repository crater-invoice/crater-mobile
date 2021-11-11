import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import CreateCustomField from './create-custom-field';
import {validate} from 'stores/custom-field/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/custom-field/selectors';
import {CREATE_CUSTOM_FIELD_FORM} from 'stores/custom-field/types';
import {modalTypes, dataTypes} from 'stores/custom-field/helpers';

const mapStateToProps = (state, {route}) => ({
  ...loadingSelector(state),
  ...commonSelector(state),
  ...permissionSelector(route),
  formValues: getFormValues(CREATE_CUSTOM_FIELD_FORM)(state) || {},
  initialValues: {
    name: null,
    type: dataTypes.INPUT,
    model_type: modalTypes.CUSTOMER,
    is_required: false,
    label: null,
    default_answer: null,
    placeholder: null,
    options: [],
    order: 1
  }
});

const CreateCustomFieldForm = reduxForm({
  form: CREATE_CUSTOM_FIELD_FORM,
  validate
})(CreateCustomField);

export const CreateCustomFieldContainer = connect(mapStateToProps)(
  CreateCustomFieldForm
);
