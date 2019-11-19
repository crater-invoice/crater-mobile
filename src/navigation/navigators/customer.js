
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import CustomerContainer from "../../features/customers/containers/Customer";

export const CustomerNavigator = {

    [ROUTES.CUSTOMER]: generateStackNavigation(
        ROUTES.CUSTOMER,
        CustomerContainer,
    ),
}

