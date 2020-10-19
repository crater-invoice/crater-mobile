import { createBottomTabNavigator } from "react-navigation";
import InvoicesContainer from '../../features/invoices/containers/Invoices';
import CustomersContainer from '../../features/customers/containers/Customers';
import { ROUTES } from "../routes";
import { colors, fonts } from '@/styles';
import MoreContainer from "../../features/more/containers/More";
import ExpensesContainer from "../../features/expenses/containers/Expenses";
import PaymentsContainer from "../../features/payments/containers/Payments";
import { isIPhoneX } from "@/constants";

export default createBottomTabNavigator(
    {
        [ROUTES.MAIN_INVOICES]: {
            screen: InvoicesContainer
        },
        [ROUTES.MAIN_CUSTOMERS]: {
            screen: CustomersContainer
        },
        [ROUTES.MAIN_PAYMENTS]: {
            screen: PaymentsContainer
        },
        [ROUTES.MAIN_EXPENSES]: {
            screen: ExpensesContainer
        },
        [ROUTES.MAIN_MORE]: {
            screen: MoreContainer
        }
    },
    {
        initialRouteName: ROUTES.MAIN_INVOICES,
        navigationOptions: {
            header: null,
            headerTitleAllowFontScaling: false,
        },
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            activeTintColor: colors.primary,
            inactiveTintColor: colors.dark2,
            allowFontScaling: false,
            style: {
                backgroundColor: colors.white,
                width: '100%',
                height: isIPhoneX() ? 65 : 75,
                borderTopWidth: 0,
                paddingVertical: 7,
                position: "relative",
                bottom: 0,
                left: 0,
                right: 0,
                marginBottom: 0
            },
            labelStyle: {
                fontFamily: fonts.poppinsMedium,
                fontSize: 11,
                marginTop: -4,
            },
        }
    }
);
