import { connect } from 'react-redux';
import Companies from '../../components/Companies';
import { reduxForm } from 'redux-form';
import { COMPANIES_FORM } from '../../constants';
import { getCompaniesState } from '../../selectors';

const mapStateToProps = ({ common, global }) => ({
    companies: getCompaniesState(common?.companies),
    locale: global?.locale,
    ...common.loading
});

const CompaniesForm = reduxForm({
    form: COMPANIES_FORM
})(Companies);

const CompaniesContainer = connect(mapStateToProps)(CompaniesForm);

CompaniesContainer.navigationOptions = () => ({
    header: null
});

export default CompaniesContainer;
