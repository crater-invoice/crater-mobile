import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import ViewRecurringInvoice from './view-recurring-invoice';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoice/types';
import {validate} from 'stores/recurring-invoice/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {
  loadingSelector,
  statusSelector
} from 'stores/recurring-invoice/selectors';
import {routes} from '@/navigation';

const mapStateToProps = (state, {route}) => {
  const {
    common: {
      config: {
        recurring_invoice_status: {update_status}
      }
    }
  } = state;
  const id = route?.params?.id;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...permissionSelector({...route, name: routes.CREATE_RECURRING_INVOICE}),
    id,
    statusList: statusSelector(update_status)
  };
};

const ViewRecurringInvoiceForm = reduxForm({
  form: CREATE_RECURRING_INVOICE_FORM,
  validate
})(ViewRecurringInvoice);

export const ViewRecurringInvoiceContainer = connect(mapStateToProps)(
  ViewRecurringInvoiceForm
);
