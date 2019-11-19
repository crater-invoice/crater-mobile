import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import moment from 'moment';
import { Expense } from '../../components/Expense';
import { validate } from './validation';
import * as ExpensesAction from '../../actions';
import { EXPENSE_FORM, EXPENSE_EDIT, EXPENSE_ADD } from '../../constants';

const mapStateToProps = (state, { navigation }) => {

    const {
        global: { company, endpointURL, language },
        expenses: { loading, categories, expense } = {}
    } = state;

    const type = navigation.getParam('type', EXPENSE_ADD)
    const isLoading = loading.initExpenseLoading || (type === EXPENSE_EDIT && !expense)
        || !categories || categories.length <= 0

    return {
        language,
        categories,
        company,
        endpointURL,
        initLoading: isLoading,
        loading: loading.expenseLoading,
        type,
        formValues: getFormValues(EXPENSE_FORM)(state) || {},

        initialValues: !isLoading && {
            expense_date: moment(),
            ...expense
        }
    };
};

const mapDispatchToProps = {
    getCategories: ExpensesAction.getCategories,
    createExpense: ExpensesAction.createExpense,
    editExpense: ExpensesAction.editExpense,
    getEditExpense: ExpensesAction.getEditExpense,
    getCreateExpense: ExpensesAction.getCreateExpense,
    clearExpense: ExpensesAction.clearExpense,
    removeExpense: ExpensesAction.removeExpense,
    getReceipt: ExpensesAction.getReceipt,
};

//  Redux Forms
const addExpenseReduxForm = reduxForm({
    form: EXPENSE_FORM,
    validate,
})(Expense);

//  connect
const ExpenseContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addExpenseReduxForm);

ExpenseContainer.navigationOptions = () => ({
    header: null,
});

export default ExpenseContainer;
