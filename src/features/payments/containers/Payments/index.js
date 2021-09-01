import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as PaymentsAction from '../../actions';
import { Payments } from '../../components/Payments';
import { PAYMENT_SEARCH } from '../../constants';
import { getPaymentsState, getPaymentMethodsState } from '../../selectors';
import { getCustomers } from '@/features/customers/actions';
import { getPaymentModes } from '@/features/settings/actions';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    payments: getPaymentsState(state.payments?.payments),
    customers: state.customers?.customers,
    paymentMethods: getPaymentMethodsState(state.settings?.paymentMethods),
    formValues: getFormValues(PAYMENT_SEARCH)(state) || {},
    ...commonSelector(state)
});

const mapDispatchToProps = {
    getPayments: PaymentsAction.getPayments,
    getCustomers,
    getPaymentModes
};

const paymentSearchReduxForm = reduxForm({
    form: PAYMENT_SEARCH
})(Payments);

const PaymentsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(paymentSearchReduxForm);

PaymentsContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false
});

export default PaymentsContainer;
