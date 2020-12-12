import {
    MORE_TRIGGER_SPINNER,
    SET_ITEMS,
    CLEAR_ITEM,
    SET_ITEM,
    DELETE_ITEM
} from '../constants';

const initialState = {
    loading: {
        itemsLoading: false,
        itemLoading: false,
        getMailConfigLoading: false,
        getItemLoading: false
    },
    items: [],
    item: null
};

export default function moreReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case MORE_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case SET_ITEMS:
            const { items, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, items: [...items, ...state.items] };
            }

            if (!fresh) {
                return { ...state, items: [...state.items, ...items] };
            }

            return { ...state, items };

        case DELETE_ITEM:
            const { id } = payload;

            const remainItems = state.items.filter(val => val.id !== id);

            return { ...state, items: remainItems };

        case CLEAR_ITEM:
            return { ...state, item: null };

        case SET_ITEM:
            return { ...state, item: payload.item };

        default:
            return state;
    }
}
