import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { Expense } from '../../components/Expense';
import { validate } from './validation';
import * as actions from '../../actions';
import {
    EXPENSE_FORM,
    EXPENSE_ADD,
    EXPENSE_FIELDS as FIELDS
} from '../../constants';
import { getExpenseCategories } from '@/features/settings/actions';
import { getCategoriesState } from '../../selectors';
import { getCustomers } from '@/features/customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { endpointURL, locale },
        expenses: { loading },
        settings: { categories, customFields },
        customers: { customers }
    } = state;

    const type = navigation.getParam('type', EXPENSE_ADD);
    const id = navigation.getParam('id', null);

    return {
        locale,
        categories: getCategoriesState(categories),
        customers,
        endpointURL,
        customFields,
        loading: loading?.expenseLoading,
        type,
        id,
        formValues: getFormValues(EXPENSE_FORM)(state) || {},
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

//  Redux Forms
const addExpenseReduxForm = reduxForm({
    form: EXPENSE_FORM,
    validate
})(Expense);

//  connect
const ExpenseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addExpenseReduxForm);

ExpenseContainer.navigationOptions = () => ({
    header: null
});

export default ExpenseContainer;
