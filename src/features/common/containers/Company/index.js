import { connect } from 'react-redux';
import Company from '../../components/Company';
import { reduxForm } from 'redux-form';
import { validate } from './validation';
import { PermissionService } from '@/services';
import {
    COMPANY_FORM,
    ADD_COMPANY_TYPE,
    EDIT_COMPANY_TYPE
} from '../../constants';

const mapStateToProps = ({ common, global }, { navigation }) => {
    const company = navigation.getParam('company', {});
    const type = navigation.getParam('type', ADD_COMPANY_TYPE);
    const isLoading = common?.loading?.companyLoading;
    const isEditScreen = type === EDIT_COMPANY_TYPE;
    const isCreateScreen = type === ADD_COMPANY_TYPE;
    const isAllowToEdit = isEditScreen
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditScreen
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    return {
        loading: isLoading,
        type,
        companyId: company?.id,
        locale: global?.locale,
        isCreateScreen,
        isEditScreen,
        isAllowToEdit,
        isAllowToDelete,
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
