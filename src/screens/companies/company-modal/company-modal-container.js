import {connect} from 'react-redux';
import CompanyModal from './company-modal';
import {commonSelector} from 'stores/common/selectors';
import {
  companiesSelector,
  currentCompanySelector
} from 'stores/company/selectors';

const mapStateToProps = state => ({
  companies: companiesSelector(state),
  selectedCompany: currentCompanySelector(state),
  ...commonSelector(state)
});

export const CompanyModalContainer = connect(mapStateToProps)(CompanyModal);
