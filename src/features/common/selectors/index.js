import { createSelector } from 'reselect';
import { isEmpty } from '@/constants';

const getCompaniesState = createSelector(
    companies => companies,
    companies => {
        if (isEmpty(companies)) {
            return [];
        }

        if (companies?.[0]?.fullItem) {
            return companies;
        }

        return companies.map(company => {
            const { name, logo_path } = company;
            return {
                title: name,
                leftAvatar: name.toUpperCase().charAt(0),
                leftImage: logo_path,
                fullItem: company
            };
        });
    }
);

export { getCompaniesState };
