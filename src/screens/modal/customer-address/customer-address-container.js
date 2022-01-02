import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CustomerAddress from './customer-address';
import {commonSelector} from 'stores/common/selectors';
import validate from './customer-address-validator';
import {SHIPPING_ADDRESS_FORM} from 'stores/customer/types';

const mapStateToProps = (state, {route}) => ({
  ...commonSelector(state),
  address: route?.params?.address,
  initialValues: {
    state: null,
    city: null,
    zip: null,
    address_street_1: null,
    address_street_2: null
  }
});

const CustomerAddressForm = reduxForm({form: SHIPPING_ADDRESS_FORM, validate})(
  CustomerAddress
);

export default connect(mapStateToProps)(CustomerAddressForm);
