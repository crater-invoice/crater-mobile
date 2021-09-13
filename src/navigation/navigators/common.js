import {routes} from '../routes';
import {generateStackNavigation} from '../actions';
import Companies from '@/features/common/containers/Companies';
import Company from '@/features/common/containers/Company';

export const CommonNavigator = {
  [routes.COMPANIES]: generateStackNavigation(routes.COMPANIES, Companies),
  [routes.COMPANY]: generateStackNavigation(routes.COMPANY, Company)
};
