import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateCompany from './create-company';
import {validateCompany as validate} from 'stores/company/validator';
import {commonSelector, countriesSelector} from 'stores/common/selectors';
import {currenciesSelector, loadingSelector} from 'stores/company/selectors';
import {CREATE_COMPANY_FORM} from 'stores/company/types';

const mapStateToProps = state => ({
  ...loadingSelector(state),
  ...commonSelector(state),
  countries: countriesSelector(state),
  currencies: currenciesSelector(state),
  formValues: getFormValues(CREATE_COMPANY_FORM)(state) || {},
  initialValues: {
    name: null,
    country_id: null,
    currency: null
  }
});

const CreateCompanyForm = reduxForm({form: CREATE_COMPANY_FORM, validate})(
  CreateCompany
);

export const CreateCompanyContainer = connect(mapStateToProps)(
  CreateCompanyForm
);
