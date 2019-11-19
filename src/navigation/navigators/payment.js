
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import PaymentContainer from "../../features/payments/containers/Payment";


export const PaymentNavigator = {

    [ROUTES.PAYMENT]: generateStackNavigation(
        ROUTES.PAYMENT,
        PaymentContainer,
    ),

}



