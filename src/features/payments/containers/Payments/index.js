import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as PaymentsAction from '../../actions';
import { colors } from '../../../../styles/colors';
import { Payments } from '../../components/Payments';
import { PAYMENT_SEARCH } from '../../constants';
import { SvgXml } from 'react-native-svg';
import { PAYMETNS } from '../../../../assets/svg';
import { getCustomers } from '../../../customers/actions';
import { getTitleByLanguage } from '../../../../navigation/actions';
import { withNavigationFocus } from 'react-navigation';
import { getPaymentModes } from '../../../settings/actions';
import {
    getPaymentsState,
    getFilterPaymentsState,
    getPaymentMethodsState
} from '../../selectors';

const mapStateToProps = state => {
    const {
        global: { language },
        customers: { customers },
        payments: {
            payments,
            filterPayments,
            loading: { paymentsLoading }
        },
        settings: {
            paymentMethods,
            loading: { paymentModesLoading }
        }
    } = state;

    return {
        payments: getPaymentsState(payments),
        filterPayments: getFilterPaymentsState(filterPayments),
        loading: paymentsLoading,
        paymentModesLoading,
        language,
        customers,
        paymentMethods: getPaymentMethodsState(paymentMethods),

        formValues: getFormValues(PAYMENT_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getPayments: PaymentsAction.getPayments,
    getCustomers: getCustomers,
    getPaymentModes: getPaymentModes
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
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.payments'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={PAYMETNS}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    )
});

export default withNavigationFocus(PaymentsContainer);
