import {connect} from 'react-redux';
import {Company} from '../../components/Company';
import {reduxForm, getFormValues} from 'redux-form';
import {EDIT_COMPANY} from '../../constants';
import * as CompanyAction from '../../actions';
import {validate} from './validation';
import {getCountries} from '@/features/customers/actions';
import {PermissionService} from '@/services';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  const {
    settings: {
      loading: {editCompanyInfoLoading, getCompanyInfoLoading}
    },
    customers: {
      countries,
      loading: {countriesLoading}
    }
  } = state;
  const isAllowToEdit = PermissionService.isAllowToManage(
    navigation?.state?.routeName
  );

  return {
    formValues: getFormValues(EDIT_COMPANY)(state) || {},
    editCompanyLoading: editCompanyInfoLoading,
    getCompanyInfoLoading,
    countries,
    countriesLoading,
    isAllowToEdit,
    ...commonSelector(state),
    initialValues: {
      name: null,
      country_id: null,
      state: null,
      city: null,
      zip: null,
      address_street_1: null,
      address_street_2: null,
      phone: null
    }
  };
};

const mapDispatchToProps = {
  editCompanyInformation: CompanyAction.editCompanyInformation,
  getCompanyInformation: CompanyAction.getCompanyInformation,
  getCountries
};

const CompanyReduxForm = reduxForm({
  form: EDIT_COMPANY,
  validate
})(Company);

const CompanyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyReduxForm);

export default CompanyContainer;
