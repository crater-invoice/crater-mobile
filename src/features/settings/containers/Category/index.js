import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { Category } from '../../components/Category';
import { CATEGORY_FORM, CATEGORY_ADD, CATEGORY_EDIT } from '../../constants';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        settings: {
            loading: { expenseCategoryLoading, initExpenseCategoryLoading }
        }
    } = state;

    let type = navigation.getParam('type', CATEGORY_ADD);
    const isEditScreen = type === CATEGORY_EDIT;
    const isAllowToEdit = isEditScreen
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditScreen
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    return {
        categoryLoading: expenseCategoryLoading,
        getEditCategoryLoading: initExpenseCategoryLoading,
        type,
        isEditScreen,
        isAllowToEdit,
        isAllowToDelete,
        formValues: getFormValues(CATEGORY_FORM)(state) || {},
        ...commonSelector(state),
        initialValues: {
            name: null,
            description: null
        }
    };
};

const mapDispatchToProps = {
    createCategory: actions.createExpenseCategory,
    getEditCategory: actions.getEditExpenseCategory,
    editCategory: actions.editExpenseCategory,
    removeCategory: actions.removeExpenseCategory
};

const addEditPaymentReduxForm = reduxForm({
    form: CATEGORY_FORM,
    validate
})(Category);

const AddEditCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addEditPaymentReduxForm);

AddEditCategoryContainer.navigationOptions = () => ({
    header: null
});

export default AddEditCategoryContainer;
