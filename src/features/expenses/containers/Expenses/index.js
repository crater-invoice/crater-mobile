import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as ExpensesAction from '../../actions';
import * as CategoriesAction from '../../../settings/actions';
import { colors } from '@/styles';
import { Expenses } from '../../components/Expenses';
import { EXPENSE_SEARCH } from '../../constants';
import { EXPENSES_ICON } from '@/assets';
import { getTitleByLanguage } from '@/utils';
import { AssetSvg } from '@/components';
import { getExpensesState, getCategoriesState } from '../../selectors';
import { getCustomers } from '@/features/customers/actions';

const mapStateToProps = state => {
    const {
        global: { locale, currency },
        expenses: { expenses },
        settings: { categories },
        customers: { customers }
    } = state;

    return {
        expenses: getExpensesState(expenses, currency),
        locale,
        currency,
        customers,
        categories: getCategoriesState(categories),
        formValues: getFormValues(EXPENSE_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getExpenses: ExpensesAction.getExpenses,
    getCategories: CategoriesAction.getExpenseCategories,
    getCustomers
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
        <AssetSvg
            name={EXPENSES_ICON}
            fill={focused ? colors.primary : colors.darkGray}
        />
    )
});

export default ExpensesContainer;
