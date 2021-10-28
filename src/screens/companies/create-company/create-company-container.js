import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateCompany from './create-company';
import {validateCompany as validate} from 'stores/company/validator';
import {commonSelector, countriesSelector} from 'stores/common/selectors';
import {
  currenciesSelector,
  currentCurrencySelector,
  loadingSelector
} from 'stores/company/selectors';
import {CREATE_COMPANY_FORM} from 'stores/company/types';

const mapStateToProps = (state, {route}) => {
  const isCreateScreen = route?.params?.type === 'ADD';

  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    isCreateScreen,
    isEditScreen: !isCreateScreen,
    currency: currentCurrencySelector(state),
    countries: countriesSelector(state),
    currencies: currenciesSelector(state),
    formValues: getFormValues(CREATE_COMPANY_FORM)(state) || {},
    initialValues: {
      name: null,
      country_id: null,
      currency: null,
      state: null,
      city: null,
      zip: null,
      address_street_1: null,
      address_street_2: null,
      phone: null
    }
  };
};

const CreateCompanyForm = reduxForm({form: CREATE_COMPANY_FORM, validate})(
  CreateCompany
);

export const CreateCompanyContainer = connect(mapStateToProps)(
  CreateCompanyForm
);
