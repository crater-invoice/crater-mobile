import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { CUSTOM_FIELDS_FORM } from '../../constants';
import * as CustomFieldsAction from '../../actions';
import { CustomFields } from '../../components/CustomFields';
import { getCustomFieldsState } from '../../selectors';

const mapStateToProps = state => {
    const {
        global: { locale, theme },
        settings: { customFields }
    } = state;

    return {
        locale,
        customFields: getCustomFieldsState({ customFields, theme })
    };
};

const mapDispatchToProps = {
    getCustomFields: CustomFieldsAction.getCustomFields
};

//  Redux Forms
const customFieldsForm = reduxForm({
    form: CUSTOM_FIELDS_FORM
})(CustomFields);

//  connect
const CustomFieldsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(customFieldsForm);

CustomFieldsContainer.navigationOptions = () => ({
    header: null
});

export default CustomFieldsContainer;
