import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import {
    PAYMENT_FORM,
    PAYMENT_ADD,
    PAYMENT_FIELDS as FIELDS,
    PAYMENT_EDIT
} from '../../constants';
import { Payment } from '../../components/Payment';
import { getCustomers } from '@/features/customers/actions';
import { getPaymentModes, getNotes } from '@/features/settings/actions';
import { getPaymentMethodsState } from '../../selectors';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        customers: { customers },
        global: { currency },
        settings: { paymentMethods, notes, customFields },
        payments: { loading, unPaidInvoices }
    } = state;

    const type = navigation.getParam('type', PAYMENT_ADD);
    const id = navigation.getParam('paymentId', null);
    const invoice = navigation.getParam('invoice', null);
    const hasRecordPayment = navigation.getParam('hasRecordPayment', false);

    const isEditScreen = type === PAYMENT_EDIT;
    const isAllowToEdit = isEditScreen
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditScreen
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    return {
        type,
        customers,
        invoice,
        notes,
        hasRecordPayment,
        isAllowToEdit,
        isAllowToDelete,
        isEditScreen,
        loading: loading?.paymentLoading,
        withLoading: loading?.sendReceiptLoading,
        unPaidInvoices,
        customFields,
        id,
        paymentMethods: getPaymentMethodsState(paymentMethods),
        formValues: getFormValues(PAYMENT_FORM)(state) || {},
        currency,
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
