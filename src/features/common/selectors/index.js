import { createSelector } from 'reselect';
import { isEmpty } from '@/constants';

const getCompaniesState = createSelector(
    companies => companies,
    companies => {
        if (isEmpty(companies)) {
            return [];
        }

        return companies.map(company => {
            const { name, logo } = company;
            return {
                title: name,
                leftAvatar: name.toUpperCase().charAt(0),
                leftImage: logo,
                fullItem: company
            };
        });
    }
);

export { getCompaniesState };
