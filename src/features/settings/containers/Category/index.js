import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { Category } from '../../components/Category';
import { CATEGORY_FORM, CATEGORY_ADD } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale },
        settings: {
            loading: { expenseCategoryLoading, initExpenseCategoryLoading }
        }
    } = state;

    let type = navigation.getParam('type', CATEGORY_ADD);

    return {
        categoryLoading: expenseCategoryLoading,
        getEditCategoryLoading: initExpenseCategoryLoading,
        type,
        locale,
        formValues: getFormValues(CATEGORY_FORM)(state) || {}
    };
};

const mapDispatchToProps = {
    createCategory: actions.createExpenseCategory,
    getEditCategory: actions.getEditExpenseCategory,
    editCategory: actions.editExpenseCategory,
    removeCategory: actions.removeExpenseCategory
};

//  Redux Forms
const addEditPaymentReduxForm = reduxForm({
    form: CATEGORY_FORM,
    validate
})(Category);

//  connect
const AddEditCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addEditPaymentReduxForm);

AddEditCategoryContainer.navigationOptions = () => ({
    header: null
});

export default AddEditCategoryContainer;
