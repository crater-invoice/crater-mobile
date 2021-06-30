import React from 'react';
import { connect } from 'react-redux';
import { Customers } from '../../components/Customers';
import * as CustomersAction from '../../actions';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_SEARCH } from '../../constants';

const mapStateToProps = state => {
    const {
        customers: { customers, loading },
        global: { locale }
    } = state;

    return {
        customers,
        locale,
        formValues: getFormValues(CUSTOMER_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getCustomer: CustomersAction.getCustomers
};

//  Redux Forms
const customerSearchReduxForm = reduxForm({
    form: CUSTOMER_SEARCH
})(Customers);

//  connect
const CustomersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(customerSearchReduxForm);

CustomersContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false
});

export default CustomersContainer;
