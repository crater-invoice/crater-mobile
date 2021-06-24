import * as TYPES from '../constants';

export const getCompanies = (payload = {}) => ({
    type: TYPES.GET_COMPANIES,
    payload
});
