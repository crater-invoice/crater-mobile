import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as InvoicesAction from '../../actions';
import { RECURRING_INVOICES_FORM } from '../../constants';
import { RecurringInvoices } from '../../components/RecurringInvoices';
import { getCustomers } from '@/features/customers/actions';
import { commonSelector } from 'modules/common/selectors';
import {
    getDueInvoicesState,
    getDraftInvoicesState,
    getAllInvoicesState
} from '../../selectors';

const mapStateToProps = state => {
    const {
        invoices: {
            invoices,
            loading: { invoicesLoading }
        }
    } = state;

    return {
        invoices,
        dueInvoices: getDueInvoicesState(invoices ?? []),
        draftInvoices: getDraftInvoicesState(invoices ?? []),
        allInvoices: getAllInvoicesState(invoices ?? []),
        loading: invoicesLoading,
        customers: state.customers?.customers,
        formValues: getFormValues(RECURRING_INVOICES_FORM)(state) || {},
        ...commonSelector(state)
    };
};

const mapDispatchToProps = {
    getRecurringInvoices: InvoicesAction.getRecurringInvoices,
    getCustomers: getCustomers
};

const recurringInvoicesForm = reduxForm({
    form: RECURRING_INVOICES_FORM
})(RecurringInvoices);

const RecurringInvoicesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(recurringInvoicesForm);

RecurringInvoicesContainer.navigationOptions = () => ({
    header: null
});

export default RecurringInvoicesContainer;
