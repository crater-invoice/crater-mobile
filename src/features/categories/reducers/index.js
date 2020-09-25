import {
    SET_CREATE_EXPENSE_CATEGORIES,
    SET_EDI_EXPENSE_CATEGORIES,
    SET_REMOVE_EXPENSE_CATEGORIES,
    SET_EXPENSE_CATEGORIES,
} from '../constants';

const initialState = {
    categories: [],
};

export default function settingReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_EXPENSE_CATEGORIES:

            return { ...state, ...payload };

        case SET_CREATE_EXPENSE_CATEGORIES:

            return {
                ...state, categories:
                    [...payload.categories, ...state.categories]
            };

        case SET_EDI_EXPENSE_CATEGORIES:

            let itemIndex = 0;

            state.categories.map((val, index) => {
                if (val.id === payload.id)
                    itemIndex = index
            })

            state.categories.splice(itemIndex, 1)

            return {
                ...state,
                categories: [...payload.categories, ...state.categories]
            }

        case SET_REMOVE_EXPENSE_CATEGORIES:

            const category = state.categories.filter((val) =>
                (val.id !== payload.id))

            return { ...state, categories: category };

        default:
            return state;
    }
}
