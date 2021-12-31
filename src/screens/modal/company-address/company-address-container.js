import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CompanyAddress from './company-address';
import {commonSelector} from 'stores/common/selectors';
import validate from './company-address-validator';
import {
  currentCompanySelector,
  currentCurrencySelector,
  loadingSelector
} from 'stores/company/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state),
  selectedCompany: currentCompanySelector(state),
  currency: currentCurrencySelector(state),
  ...loadingSelector(state),
  initialValues: {
    state: null,
    city: null,
    zip: null,
    address_street_1: null,
    address_street_2: null
  }
});

const CompanyAddressForm = reduxForm({form: 'COMPANY_ADDRESS_FORM', validate})(
  CompanyAddress
);

export default connect(mapStateToProps)(CompanyAddressForm);
