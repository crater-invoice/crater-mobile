import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_ADDRESS } from '../../constants';
import { Address } from '../../components/Address';
import { getStateCountries } from '../../selectors';

const mapStateToProps = state => {
    const {
        global: { locale },
        customers: { countries }
    } = state;

    return {
        formValues: getFormValues(CUSTOMER_ADDRESS)(state) || {},
        locale,
        countries: getStateCountries(countries)
    };
};

const mapDispatchToProps = {};

//  Redux Forms
const addressReduxForm = reduxForm({
    form: CUSTOMER_ADDRESS
})(Address);

//  connect
const AddressContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addressReduxForm);

AddressContainer.navigationOptions = () => ({
    header: null
});

export default AddressContainer;
