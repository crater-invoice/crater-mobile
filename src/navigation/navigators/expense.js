
import { ROUTES } from "../routes";
import ExpenseContainer from "../../features/expenses/containers/Expense";
import { generateStackNavigation } from "../actions";

export const ExpenseNavigator = {

    [ROUTES.EXPENSE]: generateStackNavigation(
        ROUTES.EXPENSE,
        ExpenseContainer,
    )

}

