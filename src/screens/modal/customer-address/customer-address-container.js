import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CustomerAddress from './customer-address';
import {commonSelector} from 'stores/common/selectors';
import validate from './customer-address-validator';
import {CUSTOMER_ADDRESS_FORM} from 'stores/customer/types';
import {loadingSelector} from 'stores/taxation/selectors';

const mapStateToProps = (state, {route}) => ({
  ...commonSelector(state),
  address: route?.params?.address,
  parentForm: route?.params?.parentForm,
  addressType: route?.params?.address?.addressType,
  isSaving: loadingSelector(state),
  initialValues: {
    state: null,
    city: null,
    zip: null,
    address_street_1: null,
    address_street_2: null
  }
});

const CustomerAddressForm = reduxForm({form: CUSTOMER_ADDRESS_FORM, validate})(
  CustomerAddress
);

export default connect(mapStateToProps)(CustomerAddressForm);
