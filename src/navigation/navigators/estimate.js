import EstimatesContainer from '../../features/estimates/containers/Estimates';
import EstimateContainer from '../../features/estimates/containers/Estimate';
import EstimateItemContainer from '../../features/estimates/containers/Item';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const EstimateNavigator = {

    [ROUTES.ESTIMATE_LIST]: generateStackNavigation(
        ROUTES.ESTIMATE_LIST,
        EstimatesContainer,
    ),
    [ROUTES.ESTIMATE]: generateStackNavigation(
        ROUTES.ESTIMATE,
        EstimateContainer,
    ),
    [ROUTES.ESTIMATE_ITEM]: generateStackNavigation(
        ROUTES.ESTIMATE_ITEM,
        EstimateItemContainer,
    ),
}
