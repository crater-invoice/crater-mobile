import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as actions from '../../actions';
import {Customer} from '../../components/Customer';
import {getStateCurrencies} from '../../selectors';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {CUSTOMER_FORM, CUSTOMER_FIELDS as FIELDS} from '../../constants';

const mapStateToProps = (state, {route}) => {
  const {
    common: {currencies, currency},
    customers: {countries, loading}
  } = state;
  const customFields = state.settings?.customFields;
  return {
    formValues: getFormValues(CUSTOMER_FORM)(state) || {},
    currencies: getStateCurrencies(currencies),
    countries,
    currency,
    customFields,
    loading: loading?.customerLoading,
    ...permissionSelector(route),
    ...commonSelector(state),
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
        [FIELDS.CUSTOM_FIELDS]: null
      }
    }
  };
};

const mapDispatchToProps = {
  ...actions
};

const customerReduxForm = reduxForm({
  form: CUSTOMER_FORM,
  validate
})(Customer);

const CustomerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(customerReduxForm);

export default CustomerContainer;
