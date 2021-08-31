import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { Expense } from '../../components/Expense';
import { validate } from './validation';
import * as actions from '../../actions';
import { getExpenseCategories } from '@/features/settings/actions';
import { getCategoriesState } from '../../selectors';
import { getCustomers } from '@/features/customers/actions';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';
import {
    EXPENSE_FORM,
    EXPENSE_ADD,
    EXPENSE_FIELDS as FIELDS,
    EXPENSE_EDIT
} from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { endpointURL, currency },
        expenses: { loading },
        settings: { categories, customFields }
    } = state;

    const type = navigation.getParam('type', EXPENSE_ADD);
    const id = navigation.getParam('id', null);

    const isEditScreen = type === EXPENSE_EDIT;
    const isAllowToEdit = isEditScreen
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditScreen
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    return {
        categories: getCategoriesState(categories),
        customers: state.customers?.customers,
        endpointURL,
        customFields,
        loading: loading?.expenseLoading,
        type,
        id,
        currency,
        isEditScreen,
        isAllowToEdit,
        isAllowToDelete,
        formValues: getFormValues(EXPENSE_FORM)(state) || {},
        ...commonSelector(state),
        initialValues: {
            expense: {
                [FIELDS.RECEIPT]: '',
                [FIELDS.NOTES]: '',
                [FIELDS.CUSTOMER]: '',
                [FIELDS.CUSTOM_FIELDS]: ''
            }
        }
    };
};

const mapDispatchToProps = {
    ...actions,
    getCategories: getExpenseCategories,
    getCustomers
};

const addExpenseReduxForm = reduxForm({
    form: EXPENSE_FORM,
    validate
})(Expense);

const ExpenseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addExpenseReduxForm);

ExpenseContainer.navigationOptions = () => ({
    header: null
});

export default ExpenseContainer;
