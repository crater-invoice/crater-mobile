import {connect} from 'react-redux';
import Company from '../../components/Company';
import {reduxForm} from 'redux-form';
import {validate} from './validation';
import {COMPANY_FORM} from '../../constants';
import {permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route, navigation}) => {
  const {common} = state;
  const company = route?.params?.company ?? {};
  const isLoading = state.company?.loading?.companyLoading;

  return {
    loading: isLoading,
    companyId: company?.id,
    locale: common?.locale,
    ...permissionSelector(navigation),
    initialValues: {
      name: '',
      ...company
    }
  };
};

const CompanyForm = reduxForm({
  form: COMPANY_FORM,
  validate
})(Company);

const CompanyContainer = connect(mapStateToProps)(CompanyForm);

export default CompanyContainer;
