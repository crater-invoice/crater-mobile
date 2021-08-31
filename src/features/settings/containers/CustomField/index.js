import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as CustomFieldAction from '../../actions';
import {
    CREATE_CUSTOM_FIELD_TYPE,
    CUSTOM_FIELD_FORM,
    CUSTOM_FIELDS as FIELDS,
    CUSTOM_FIELD_MODAL_TYPES as MODAL_TYPES,
    CUSTOM_FIELD_DATA_TYPE_LIST as DATA_TYPES,
    EDIT_CUSTOM_FIELD_TYPE
} from '../../constants';
import { CustomField } from '../../components/CustomField';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        settings: {
            loading: {
                customFieldLoading,
                getCustomFieldLoading,
                removeCustomFieldLoading
            }
        }
    } = state;

    let type = navigation.getParam('type', CREATE_CUSTOM_FIELD_TYPE);
    let field = navigation.getParam('field', {});
    let id = field?.id;

    const isEditScreen = type === EDIT_CUSTOM_FIELD_TYPE;
    const isAllowToEdit = isEditScreen
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditScreen
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    return {
        loading: customFieldLoading,
        getCustomFieldLoading,
        removeCustomFieldLoading,
        currency: state.global?.currency,
        type,
        field,
        id,
        isEditScreen,
        isAllowToEdit,
        isAllowToDelete,
        formValues: getFormValues(CUSTOM_FIELD_FORM)(state) || {},
        ...commonSelector(state),
        initialValues:
            type === CREATE_CUSTOM_FIELD_TYPE
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

CustomFieldContainer.navigationOptions = () => ({
    header: null
});

export default CustomFieldContainer;
