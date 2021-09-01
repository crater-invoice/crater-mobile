import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as InvoicesAction from '../../actions';
import { RECURRING_FORM, RECURRING_EDIT } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';
import { RecurringInvoice } from '../../components/RecurringInvoice';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { taxTypes },
        invoices: { loading, invoiceItems, invoiceData, items }
    } = state;

    const {
        invoice = null,
        invoiceTemplates,
        terms_and_conditions = null,
        invoice_notes = ''
    } = invoiceData;

    let type = navigation.getParam('type');

    let isLoading =
        loading.initInvoiceLoading || (type === RECURRING_EDIT && !invoice);

    return {
        initLoading: isLoading,
        loading: loading.invoiceLoading,
        invoiceItems,
        invoiceData,
        items,
        type,
        customers: state.customers?.customers,
        itemsLoading: loading.itemsLoading,
        formValues: getFormValues(RECURRING_FORM)(state) || {},
        taxTypes,
        ...commonSelector(state),
        initialValues: !isLoading
            ? {
                  due_date: moment().add(7, 'days'),
                  startOn: moment(),
                  neverExpire: true,
                  discount_type: 'fixed',
                  discount: 0,
                  taxes: [],
                  template_name: invoiceTemplates[0] && invoiceTemplates[0].id,
                  display_terms_and_conditions: false,
                  terms_and_conditions,
                  notes: invoice_notes,
                  ...invoice,
                  customer: invoice && invoice.user,
                  template: invoice && invoice.invoice_template
              }
            : null
    };
};

const mapDispatchToProps = {
    ...InvoicesAction,
    getCustomers: CustomersAction.getCustomers
};

const recurringInvoiceForm = reduxForm({
    form: RECURRING_FORM,
    validate
})(RecurringInvoice);

const RecurringInvoiceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(recurringInvoiceForm);

RecurringInvoiceContainer.navigationOptions = () => ({
    header: null
});

export default RecurringInvoiceContainer;
