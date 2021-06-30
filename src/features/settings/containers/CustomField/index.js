import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as CustomFieldAction from '../../actions';
import {
    CREATE_CUSTOM_FIELD_TYPE,
    CUSTOM_FIELD_FORM,
    CUSTOM_FIELDS as FIELDS,
    CUSTOM_FIELD_MODAL_TYPES as MODAL_TYPES,
    CUSTOM_FIELD_DATA_TYPE_LIST as DATA_TYPES
} from '../../constants';
import { CustomField } from '../../components/CustomField';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale, currency, theme },
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

    return {
        loading: customFieldLoading,
        getCustomFieldLoading,
        removeCustomFieldLoading,
        currency,
        type,
        field,
        id,
        locale,
        theme,
        formValues: getFormValues(CUSTOM_FIELD_FORM)(state) || {},
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

//  Redux Forms
const customFieldForm = reduxForm({
    form: CUSTOM_FIELD_FORM,
    validate
})(CustomField);

//  connect
const CustomFieldContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(customFieldForm);

CustomFieldContainer.navigationOptions = () => ({
    header: null
});

export default CustomFieldContainer;
