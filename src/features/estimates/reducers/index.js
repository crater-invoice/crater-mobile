import {
    SET_ESTIMATES,
    CLEAR_ESTIMATES,
    ESTIMATES_TRIGGER_SPINNER,
    GET_ESTIMATES,
    GET_ITEMS,
    SET_ITEMS,
    SET_ESTIMATE_ITEMS,
    REMOVE_ESTIMATE_ITEM,
    SET_EDIT_ESTIMATE,
    REMOVE_ESTIMATE_ITEMS,
    CLEAR_ESTIMATE,
    SET_ESTIMATE,
    REMOVE_FROM_ESTIMATES
} from '../constants';

const initialState = {
    estimates: [],
    items: [],
    errors: null,
    loading: {
        estimatesLoading: false,
        itemsLoading: false,
        estimateLoading: false,
        initEstimateLoading: false,
        changeStatusLoading: false,
        removeEstimateLoading: false
    },
    estimateData: {
        estimate: null,
        estimateTemplates: [],
        nextEstimateNumber: ''
    },
    estimateItems: []
};

export default function estimatesReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_ESTIMATES:
            let { estimates, fresh, prepend } = payload;

            if (prepend) {
                return {
                    ...state,
                    estimates: [...estimates, ...state.estimates]
                };
            }

            if (!fresh) {
                return {
                    ...state,
                    estimates: [...state.estimates, ...estimates]
                };
            }

            return { ...state, estimates };

        case CLEAR_ESTIMATES:
            return { ...state, estimates: [] };

        case CLEAR_ESTIMATE:
            return {
                ...state,
                estimateItems: [],
                items: [],
                estimateData: {
                    estimate: null,
                    estimateTemplates: []
                }
            };

        case GET_ESTIMATES:
            return { ...state };

        case SET_ESTIMATE:
            return { ...state, estimateData: payload };

        case SET_EDIT_ESTIMATE:
            return { ...state, ...payload };

        case ESTIMATES_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:
            const { items } = payload;

            if (!payload.fresh) {
                return { ...state, items: [...state.items, ...items] };
            }
            return { ...state, items };

        case SET_ESTIMATE_ITEMS:
            const { estimateItem } = payload;

            return {
                ...state,
                estimateItems: [...state.estimateItems, ...estimateItem]
            };

        case REMOVE_ESTIMATE_ITEM:
            const { id } = payload;

            const estimateItems = state.estimateItems.filter(
                val => (val.item_id || val.id) !== id
            );

            return { ...state, estimateItems };

        case REMOVE_ESTIMATE_ITEMS:
            return { ...state, estimateItems: [] };

        case REMOVE_FROM_ESTIMATES:
            const newEstimates = state.estimates.filter(
                val => val.id !== payload.id
            );

            return { ...state, estimates: newEstimates };

        case GET_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
