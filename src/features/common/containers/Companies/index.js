import { connect } from 'react-redux';
import Companies from '../../components/Companies';
import { reduxForm } from 'redux-form';
import { COMPANIES_FORM } from '../../constants';
import { getCompaniesState } from '../../selectors';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    companies: getCompaniesState(state.company?.companies),
    ...state.company.loading,
    ...commonSelector(state)
});

const CompaniesForm = reduxForm({
    form: COMPANIES_FORM
})(Companies);

const CompaniesContainer = connect(mapStateToProps)(CompaniesForm);

CompaniesContainer.navigationOptions = () => ({
    header: null
});

export default CompaniesContainer;
