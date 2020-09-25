import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as ExpensesAction from '../../actions'
import * as CategoriesAction from '../../../categories/actions';
import { colors } from '../../../../styles/colors';
import { Expenses } from '../../components/Expenses';
import { EXPENSE_SEARCH } from '../../constants';
import { EXPENSES } from '../../../../assets/svg';
import { SvgXml } from 'react-native-svg';
import { getTitleByLanguage, navigateToMainTabs } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';
import { withNavigationFocus } from 'react-navigation';


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

        if (navigation.isFocused()) {
            return;
        }

        navigateToMainTabs(navigation, ROUTES.MAIN_EXPENSES)
    }
});

export default withNavigationFocus(ExpensesContainer);
