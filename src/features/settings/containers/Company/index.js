import {connect} from 'react-redux';
import {Company} from '../../components/Company';
import {reduxForm, getFormValues} from 'redux-form';
import {EDIT_COMPANY} from '../../constants';
import * as CompanyAction from '../../actions';
import {validate} from './validation';
import {PermissionService} from '@/services';
import {commonSelector, countriesSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    settings: {
      loading: {editCompanyInfoLoading, getCompanyInfoLoading}
    }
  } = state;
  const isAllowToEdit = PermissionService.isAllowToManage(route?.name);

  return {
    formValues: getFormValues(EDIT_COMPANY)(state) || {},
    editCompanyLoading: editCompanyInfoLoading,
    getCompanyInfoLoading,
    countries: countriesSelector(state),
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
  getCompanyInformation: CompanyAction.getCompanyInformation
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
