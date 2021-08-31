import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { CUSTOM_FIELDS_FORM } from '../../constants';
import * as CustomFieldsAction from '../../actions';
import { CustomFields } from '../../components/CustomFields';
import { getCustomFieldsState } from '../../selectors';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = state => {
    const {
        global: { theme },
        settings: { customFields }
    } = state;

    return {
        customFields: getCustomFieldsState({ customFields, theme }),
        ...commonSelector(state)
    };
};

const mapDispatchToProps = {
    getCustomFields: CustomFieldsAction.getCustomFields
};

const customFieldsForm = reduxForm({
    form: CUSTOM_FIELDS_FORM
})(CustomFields);

const CustomFieldsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(customFieldsForm);

CustomFieldsContainer.navigationOptions = () => ({
    header: null
});

export default CustomFieldsContainer;
