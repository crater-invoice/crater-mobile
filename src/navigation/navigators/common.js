import { ROUTES } from '../routes';
import { generateStackNavigation } from '../actions';
import Companies from '@/features/common/containers/Companies';
import Company from '@/features/common/containers/Company';

export const CommonNavigator = {
    [ROUTES.COMPANIES]: generateStackNavigation(ROUTES.COMPANIES, Companies),
    [ROUTES.COMPANY]: generateStackNavigation(ROUTES.COMPANY, Company)
};
