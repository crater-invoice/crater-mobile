import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { Customer } from '../../components/Customer';
import { getStateCurrencies } from '../../selectors';
import {
    CUSTOMER_FORM,
    CUSTOMER_ADD,
    CUSTOMER_FIELDS as FIELDS
} from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale, currencies, currency },
        customers: { countries, loading },
        settings: { customFields }
    } = state;

    const id = navigation.getParam('customerId', null);
    const type = navigation.getParam('type', CUSTOMER_ADD);

    return {
        formValues: getFormValues(CUSTOMER_FORM)(state) || {},
        type,
        locale,
        currencies: getStateCurrencies(currencies),
        countries,
        currency,
        customFields,
        loading: loading?.customerLoading,
        id,
        initialValues: {
            customer: {
                [FIELDS.NAME]: null,
                [FIELDS.CONTACT_NAME]: null,
                [FIELDS.EMAIL]: null,
                [FIELDS.PHONE]: null,
                [FIELDS.WEBSITE]: null,
                [FIELDS.CURRENCY]: null,
                [FIELDS.BILLING]: undefined,
                [FIELDS.SHIPPING]: undefined,
                [FIELDS.ENABLE_PORTAL]: null,
                [FIELDS.CUSTOM_FIELDS]: null,
                id
            }
        }
    };
};

const mapDispatchToProps = {
    ...actions
};

//  Redux Form
const customerReduxForm = reduxForm({
    form: CUSTOMER_FORM,
    validate
})(Customer);

//  connect
const CustomerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(customerReduxForm);

CustomerContainer.navigationOptions = () => ({
    header: null
});

export default CustomerContainer;
