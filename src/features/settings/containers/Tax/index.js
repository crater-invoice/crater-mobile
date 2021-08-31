import { connect } from 'react-redux';
import { Tax } from '../../components/Tax';
import { reduxForm } from 'redux-form';
import * as TaxAction from '../../actions';
import { validate } from './validation';
import { TAX_FORM, ADD_TAX, EDIT_TAX } from '../../constants';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const { settings } = state;
    const taxType = navigation.getParam('tax', {});
    const type = navigation.getParam('type', ADD_TAX);

    const isLoading =
        settings.loading.editTaxLoading ||
        settings.loading.addTaxLoading ||
        settings.loading.removeTaxLoading;

    const isEditScreen = type === EDIT_TAX;
    const isAllowToEdit = isEditScreen
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditScreen
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    return {
        loading: isLoading,
        type,
        taxId: taxType && taxType.id,
        isEditScreen,
        isAllowToEdit,
        isAllowToDelete,
        ...commonSelector(state),
        initialValues: {
            collective_tax: 0,
            compound_tax: 0,
            ...taxType
        }
    };
};

const mapDispatchToProps = {
    addTax: TaxAction.addTax,
    editTax: TaxAction.editTax,
    removeTax: TaxAction.removeTax
};

const TaxReduxForm = reduxForm({
    form: TAX_FORM,
    validate
})(Tax);

const TaxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaxReduxForm);

TaxContainer.navigationOptions = () => ({
    header: null
});

export default TaxContainer;
