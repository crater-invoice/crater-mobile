import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as ExpensesAction from '../../actions';
import * as CategoriesAction from '../../../settings/actions';
import { colors } from '@/styles';
import { Expenses } from '../../components/Expenses';
import { EXPENSE_SEARCH } from '../../constants';
import { EXPENSES_ICON } from '@/assets';
import { SvgXml } from 'react-native-svg';
import { getTitleByLanguage } from '@/utils';
import { getExpensesState, getCategoriesState } from '../../selectors';

const mapStateToProps = state => {
    const {
        global: { locale, currency },
        expenses: {
            expenses,
            loading: { expensesLoading }
        },
        settings: { categories }
    } = state;

    return {
        loading: expensesLoading,
        expenses: getExpensesState(expenses, currency),
        locale,
        currency,
        categories: getCategoriesState(categories),
        formValues: getFormValues(EXPENSE_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getExpenses: ExpensesAction.getExpenses,
    getCategories: CategoriesAction.getExpenseCategories
};
//  Redux Forms
const ExpensesSearchReduxForm = reduxForm({
    form: EXPENSE_SEARCH
})(Expenses);

//  connect
const ExpensesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpensesSearchReduxForm);

ExpensesContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.expenses'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={EXPENSES_ICON}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    )
});

export default ExpensesContainer;
