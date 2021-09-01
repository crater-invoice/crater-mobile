import { connect } from 'react-redux';
import Company from '../../components/Company';
import { reduxForm } from 'redux-form';
import { validate } from './validation';
import { COMPANY_FORM } from '../../constants';
import { permissionSelector } from 'stores/common/selectors';

const mapStateToProps = ({ common, global }, { navigation }) => {
    const company = navigation.getParam('company', {});
    const isLoading = common?.loading?.companyLoading;

    return {
        loading: isLoading,
        companyId: company?.id,
        locale: global?.locale,
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

CompanyContainer.navigationOptions = () => ({
    header: null
});

export default CompanyContainer;
