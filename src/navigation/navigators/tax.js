
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import TaxesContainer from "../../features/taxes/containers/Taxes";
import TaxContainer from "../../features/taxes/containers/Tax";

export const TaxNavigator = {
    // Taxes
    // -----------------------------------------
    [ROUTES.TAXES]: generateStackNavigation(
        ROUTES.TAXES,
        TaxesContainer,
    ),
    [ROUTES.TAX]: generateStackNavigation(
        ROUTES.TAX,
        TaxContainer,
    ),
}
