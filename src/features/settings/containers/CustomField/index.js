import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as CustomFieldAction from '../../actions';
import { CREATE_CUSTOM_FIELD_TYPE, CUSTOM_FIELD_FORM, CUSTOM_FIELDS } from '../../constants';
import { hasValue } from '../../../../api/global';
import { CustomField } from '../../components/CustomField';

const mapStateToProps = (state, { navigation }) => {

    const {
        global: { language, currency },
        settings: {
            loading: { currencyLoading }
        }
    } = state

    let type = navigation.getParam('type', CREATE_CUSTOM_FIELD_TYPE)
    let field = navigation.getParam('field', {})
    let id = field?.id

    return {
        currencyLoading,
        currency,
        type,
        id,
        language,
        formValues: getFormValues(CUSTOM_FIELD_FORM)(state) || {},
        initialValues: type === CREATE_CUSTOM_FIELD_TYPE ? {
            [CUSTOM_FIELDS.FIELD]: {
                [CUSTOM_FIELDS.IS_MANDATORY]: true
            }
        } : {
            }
    };
};

const mapDispatchToProps = {
    createCustomField: CustomFieldAction.createCustomField,
    editCustomField: CustomFieldAction.editCustomField,
    removeCustomField: CustomFieldAction.removeCustomField
};

//  Redux Forms
const customFieldForm = reduxForm({
    form: CUSTOM_FIELD_FORM,
    validate,
})(CustomField);

//  connect
const CustomFieldContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(customFieldForm);

CustomFieldContainer.navigationOptions = () => ({
    header: null,
});

export default CustomFieldContainer;
