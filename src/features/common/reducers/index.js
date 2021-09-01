import * as Actions from '../constants';

const initialState = {
    companies: [],
    loading: {}
};

export default function companyReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case Actions.SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case Actions.FETCH_COMPANIES_SUCCESS:
            return { ...state, companies: payload.companies };

        case Actions.ADD_COMPANY_SUCCESS:
            return {
                ...state,
                companies: [...state.companies, ...[payload]]
            };

        case Actions.UPDATE_COMPANY_SUCCESS:
            const companies = [];
            state.companies.map(company => {
                let value = company;
                company.id === payload.id && (value = payload);
                companies.push(value);
            });

            return { ...state, companies };

        case Actions.REMOVE_COMPANY_SUCCESS:
            return {
                ...state,
                companies: state.companies.filter(({ id }) => id !== payload)
            };

        default:
            return state;
    }
}
