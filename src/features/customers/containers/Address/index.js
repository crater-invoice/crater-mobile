import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_ADDRESS } from '../../constants';
import { Address } from '../../components/Address';

const mapStateToProps = (state) => {
    const {
        global: { language },
        customers: { countries }
    } = state

    return {
        formValues: getFormValues(CUSTOMER_ADDRESS)(state) || {},
        language,
        countries
    };
};

const mapDispatchToProps = {
};

//  Redux Forms
const addressReduxForm = reduxForm({
    form: CUSTOMER_ADDRESS,
})(Address);

//  connect
const AddressContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addressReduxForm);

AddressContainer.navigationOptions = () => ({
    header: null,
});

export default AddressContainer;

