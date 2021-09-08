import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { PAYMENT_FORM, PAYMENT_FIELDS as FIELDS } from '../../constants';
import { Payment } from '../../components/Payment';
import { getCustomers } from '@/features/customers/actions';
import {  getNotes } from '@/features/settings/actions';
import { getPaymentModes } from 'stores/payment-modes/actions';
import { getPaymentModesState } from '../../selectors';
import { commonSelector, permissionSelector } from 'stores/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        customers: { customers },
        common: { currency },
        settings: { notes, customFields },
        payments: { loading, unPaidInvoices },
        paymentModes :{modes}
    } = state;

    const id = navigation.getParam('paymentId', null);
    const invoice = navigation.getParam('invoice', null);
    const hasRecordPayment = navigation.getParam('hasRecordPayment', false);

    return {
        customers,
        invoice,
        notes,
        hasRecordPayment,
        loading: loading?.paymentLoading,
        withLoading: loading?.sendReceiptLoading,
        unPaidInvoices,
        customFields,
        id,
        paymentModes: getPaymentModesState(modes),
        formValues: getFormValues(PAYMENT_FORM)(state) || {},
        currency,
        ...permissionSelector(navigation),
        ...commonSelector(state),
        initialValues: {
            payment: {
                [FIELDS.CUSTOMER]: null,
                [FIELDS.INVOICE]: null,
                [FIELDS.METHOD]: null,
                [FIELDS.NOTES]: null
            }
        }
    };
};

const mapDispatchToProps = {
    ...actions,
    getCustomers,
    getPaymentModes,
    getNotes
};

//  Redux Form
const paymentReduxForm = reduxForm({
    form: PAYMENT_FORM,
    validate
})(Payment);

//  connect
const PaymentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(paymentReduxForm);

PaymentContainer.navigationOptions = () => ({
    header: null
});

export default PaymentContainer;
