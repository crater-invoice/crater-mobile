import {
    MORE_TRIGGER_SPINNER,
} from '../constants';
import { env } from '../../../config';

const initialState = {
    loading: {
        logoutLoading: false,
        itemsLoading: false,
        itemLoading: false,
    },
};

export default function moreReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case MORE_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        default:
            return state;
    }
}
