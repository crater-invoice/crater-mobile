import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CustomFields from './list-custom-fields';
import {commonSelector} from 'stores/common/selectors';
import {CUSTOM_FIELDS_FORM} from 'stores/custom-field/types';
import {formattedCustomFieldsSelector} from 'stores/custom-field/selectors';

const mapStateToProps = state => ({
  customFields: formattedCustomFieldsSelector(state),
  ...commonSelector(state)
});

const CustomFieldsForm = reduxForm({form: CUSTOM_FIELDS_FORM})(CustomFields);

export const CustomFieldsContainer: any = connect(mapStateToProps)(
  CustomFieldsForm
);
