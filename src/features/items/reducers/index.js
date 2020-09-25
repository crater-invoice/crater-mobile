import {
    SET_ITEMS,
    CLEAR_ITEM,
    SET_ITEM,
    DELETE_ITEM,
    SET_FILTER_ITEMS,
} from '../constants';
import { env } from '../../../config';

const initialState = {
    items: [],
    filterItems: [],
    item: null
};

export default function moreReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_ITEMS:

            const { items, fresh, prepend } = payload;

            if (prepend) {
                return { ...state, items: [...items, ...state.items] };
            }

            if (!fresh) {
                return { ...state, items: [...state.items, ...items] };
            }

            return { ...state, items };

        case SET_FILTER_ITEMS:

            if (!payload.fresh) {
                return {
                    ...state,
                    filterItems: [...state.filterItems, ...payload.items]
                };
            }

            return { ...state, filterItems: payload.items };


        case DELETE_ITEM:
            const { id } = payload

            const remainItems = state.items.filter(val => val.id !== id)

            return { ...state, items: remainItems };

        case CLEAR_ITEM:
            return { ...state, item: null };

        case SET_ITEM:
            return { ...state, item: payload.item };

        default:
            return state;
    }
}
