import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CompanyAddress from './company-address';
import {commonSelector} from 'stores/common/selectors';
import validate from './company-address-validator';
import {COMPANY_ADDRESS_FORM} from 'stores/company/types';
import {loadingSelector} from 'stores/taxation/selectors';

const mapStateToProps = (state, {route}) => ({
  ...commonSelector(state),
  address: route?.params?.address,
  parentForm: route?.params?.parentForm,
  isSaving: loadingSelector(state),
  initialValues: {
    state: null,
    city: null,
    zip: null,
    address_street_1: null,
    address_street_2: null
  }
});

const CompanyAddressForm = reduxForm({form: COMPANY_ADDRESS_FORM, validate})(
  CompanyAddress
);

export default connect(mapStateToProps)(CompanyAddressForm);
