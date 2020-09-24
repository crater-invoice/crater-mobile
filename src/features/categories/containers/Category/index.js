import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as CategoryAction from '../../actions';
import { Category } from '../../components/Category';
import { CATEGORY_FORM, CATEGORY_ADD } from '../../constants';

const mapStateToProps = (state, { navigation }) => {

    const {
        global: { language },
        categories: {
            loading: {
                expenseCategoryLoading,
                initExpenseCategoryLoading,
            }
        }
    } = state

    let type = navigation.getParam('type', CATEGORY_ADD)
    let onFirstTimeCreateExpense = navigation.getParam('onSelect', null)

    return {
        categoryLoading: expenseCategoryLoading,
        getEditCategoryLoading: initExpenseCategoryLoading,
        type,
        language,
        onFirstTimeCreateExpense,
        formValues: getFormValues(CATEGORY_FORM)(state) || {},
    };
};

const mapDispatchToProps = {
    createCategory: CategoryAction.createExpenseCategory,
    getEditCategory: CategoryAction.getEditExpenseCategory,
    editCategory: CategoryAction.editExpenseCategory,
    removeCategory: CategoryAction.removeExpenseCategory
};

//  Redux Forms
const addEditPaymentReduxForm = reduxForm({
    form: CATEGORY_FORM,
    validate,
})(Category);

//  connect
const AddEditCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addEditPaymentReduxForm);

AddEditCategoryContainer.navigationOptions = () => ({
    header: null,
});

export default AddEditCategoryContainer;
