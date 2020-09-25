import React from 'react';
import { connect } from 'react-redux';
import * as CategoriesAction from '../../actions';
import { reduxForm } from 'redux-form';
import { Categories } from '../../components/Categories';
import { CATEGORY_SEARCH } from '../../constants';

const mapStateToProps = ({ global, settings, categories }) => ({
    language: global.language,
    loading: settings.loading.expensesCategoryLoading,
    categories: categories.categories
});

const mapDispatchToProps = {
    getExpenseCategories: CategoriesAction.getExpenseCategories,
};

//  Redux Forms
const categoriesSearchReduxForm = reduxForm({
    form: CATEGORY_SEARCH,
})(Categories);

//  connect
const CategoriesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(categoriesSearchReduxForm);

CategoriesContainer.navigationOptions = () => ({
    header: null,
});

export default CategoriesContainer;
