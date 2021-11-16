import {connect} from 'react-redux';
import Invoices from './list-invoices';
import {reduxForm, getFormValues} from 'redux-form';
import {INVOICES_FORM} from 'stores/invoice/types';
import {commonSelector} from 'stores/common/selectors';
import {invoicesSelector, loadingSelector} from 'stores/invoice/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {selectedCompanySettingSelector} from 'stores/company/selectors';

const mapStateToProps = state => ({
  customers: customersSelector(state),
  invoices: invoicesSelector(state),
  formValues: getFormValues(INVOICES_FORM)(state) || {},
  selectedRetrospectiveEdits: selectedCompanySettingSelector(state)
    ?.retrospective_edits,
  ...loadingSelector(state),
  ...commonSelector(state)
});

const mapDispatchToProps = {
  fetchCustomers
};

const InvoicesForm = reduxForm({form: INVOICES_FORM})(Invoices);

export const InvoicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoicesForm);
