import EstimatesContainer from '../../features/estimates/containers/Estimates';
import EstimateContainer from '../../features/estimates/containers/Estimate';
import EstimateItemContainer from '../../features/estimates/containers/Item';
import {routes} from '../routes';
import {generateStackNavigation} from '../actions';

export const EstimateNavigator = {
  [routes.ESTIMATE_LIST]: generateStackNavigation(
    routes.ESTIMATE_LIST,
    EstimatesContainer
  ),
  [routes.ESTIMATE]: generateStackNavigation(
    routes.ESTIMATE,
    EstimateContainer
  ),
  [routes.ESTIMATE_ITEM]: generateStackNavigation(
    routes.ESTIMATE_ITEM,
    EstimateItemContainer
  )
};
