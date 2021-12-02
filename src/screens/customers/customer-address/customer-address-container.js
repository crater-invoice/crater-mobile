import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import Address from './customer-address';
import {commonSelector, countriesSelector} from 'stores/common/selectors';
import {ADDRESS_FORM} from 'stores/customer/types';

const mapStateToProps = (state, {route}) => ({
  ...commonSelector(state),
  formValues: getFormValues(ADDRESS_FORM)(state) || {},
  countries: countriesSelector(state),
  isBilling: route?.params?.type === 'billing',
  callback: route?.params?.callback,
  initialData: route?.params?.initialData,
  billingAddress: route?.params?.billingAddress,
  disabled: route?.params?.disabled,
  initialValues: {
    name: null,
    country_id: null,
    state: null,
    city: null,
    address_street_1: null,
    address_street_2: null,
    phone: null,
    zip: null
  }
});

const CustomerAddressForm = reduxForm({form: ADDRESS_FORM})(Address);

export const CustomerAddressContainer = connect(mapStateToProps)(
  CustomerAddressForm
);
