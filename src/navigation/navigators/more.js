import {routes} from '../routes';
import {generateStackNavigation} from '../actions';
import ItemsContainer from '../../features/more/containers/Items';
import ItemContainer from '../../features/more/containers/Item';
import ReportsContainer from '../../features/more/containers/Reports';
import ReportContainer from '../../features/more/containers/Report';
import LostConnectionContainer from '../../components/LostConnection';
import {Users, CreateUser} from 'screens/users';

export const MoreNavigator = {
  // Items
  // -----------------------------------------
  [routes.GLOBAL_ITEMS]: generateStackNavigation(
    routes.GLOBAL_ITEMS,
    ItemsContainer
  ),

  [routes.GLOBAL_ITEM]: generateStackNavigation(
    routes.GLOBAL_ITEM,
    ItemContainer
  ),

  // Reports
  // -----------------------------------------
  [routes.REPORTS]: generateStackNavigation(routes.REPORTS, ReportsContainer),

  [routes.GENERATE_REPORT]: generateStackNavigation(
    routes.GENERATE_REPORT,
    ReportContainer
  ),

  // Lost Connection
  // -----------------------------------------
  [routes.LOST_CONNECTION]: generateStackNavigation(
    routes.LOST_CONNECTION,
    LostConnectionContainer
  ),

  // Users
  // -----------------------------------------
  [routes.USERS]: generateStackNavigation(routes.USERS, Users),
  [routes.CREATE_USER]: generateStackNavigation(routes.CREATE_USER, CreateUser)
};
