import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as PaymentsAction from '../../actions';
import { colors } from '@/styles';
import { Payments } from '../../components/Payments';
import { PAYMENT_SEARCH } from '../../constants';
import { getPaymentsState, getPaymentMethodsState } from '../../selectors';
import { getCustomers } from '@/features/customers/actions';
import { getPaymentModes } from '@/features/settings/actions';

const mapStateToProps = state => {
    const {
        global: { locale },
        customers: { customers },
        payments: { payments },
        settings: { paymentMethods }
    } = state;

    return {
        payments: getPaymentsState(payments),
        locale,
        customers,
        paymentMethods: getPaymentMethodsState(paymentMethods),
        formValues: getFormValues(PAYMENT_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getPayments: PaymentsAction.getPayments,
    getCustomers,
    getPaymentModes
};

//  Redux Forms
const paymentSearchReduxForm = reduxForm({
    form: PAYMENT_SEARCH
})(Payments);

//  connect
const PaymentsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(paymentSearchReduxForm);

PaymentsContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false
});

export default PaymentsContainer;
