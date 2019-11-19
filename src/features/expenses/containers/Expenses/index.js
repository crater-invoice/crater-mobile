import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as ExpensesAction from '../../actions'
import * as CategoriesAction from '../../../settings/actions';
import { colors } from '../../../../styles/colors';
import { Expenses } from '../../components/Expenses';
import { EXPENSE_SEARCH } from '../../constants';
import { EXPENSES } from '../../../../assets/svg';
import { SvgXml } from 'react-native-svg';
import { getTitleByLanguage, tabBarOnPress, navigateTabRoutes, navigateRoute } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';


const mapStateToProps = (state) => {

    const {
        global: { language, currency },
        expenses: {
            expenses,
            filterExpenses,
            loading: { expensesLoading }
        },
        settings: { categories }
    } = state;


    return {
        loading: expensesLoading,
        expenses,
        filterExpenses,
        language,
        currency,
        categories,
        formValues: getFormValues(EXPENSE_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getExpenses: ExpensesAction.getExpenses,
    getCategories: CategoriesAction.getExpenseCategories,
};
//  Redux Forms
const ExpensesSearchReduxForm = reduxForm({
    form: EXPENSE_SEARCH
})(Expenses);

//  connect
const ExpensesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExpensesSearchReduxForm);

ExpensesContainer.navigationOptions = ({ navigation }) => ({

    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.expenses'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={EXPENSES}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    ),
    tabBarOnPress: () => {

        navigateTabRoutes(ROUTES.MAIN_EXPENSES, { apiCall: false })

        let apiCall = navigation.getParam('apiCall', false)

        apiCall ? navigateRoute(ROUTES.MAIN_EXPENSES) : tabBarOnPress(
            ROUTES.MAIN_EXPENSES,
            ExpensesAction.getExpenses
        )
    }
});

export default ExpensesContainer;
