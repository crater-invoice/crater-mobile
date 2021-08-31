import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { Expense } from '../../components/Expense';
import { validate } from './validation';
import * as actions from '../../actions';
import { getExpenseCategories } from '@/features/settings/actions';
import { getCategoriesState } from '../../selectors';
import { getCustomers } from '@/features/customers/actions';
import { commonSelector, permissionSelector } from 'modules/common/selectors';
import { EXPENSE_FORM, EXPENSE_FIELDS as FIELDS } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { endpointURL, currency },
        expenses: { loading },
        settings: { categories, customFields }
    } = state;
    const id = navigation.getParam('id', null);

    return {
        categories: getCategoriesState(categories),
        customers: state.customers?.customers,
        endpointURL,
        customFields,
        loading: loading?.expenseLoading,
        id,
        currency,
        formValues: getFormValues(EXPENSE_FORM)(state) || {},
        ...permissionSelector(navigation),
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
