import { find } from 'lodash';
import * as types from './constants';

const initialState = {
    users: [],
    loading: {}
};

export default function usersReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case types.SPINNER:
            return {
                ...state,
                loading: { ...state.loading, ...payload }
            };

        case types.FETCH_USERS_SUCCESS:
            return { ...state, users: payload };

        case types.ADD_USER_SUCCESS:
            return {
                ...state,
                users: [...[payload], ...state.users]
            };

        case types.UPDATE_USER_SUCCESS:
            const filteredUpdatedUsers = state.users;
            pos = filteredUpdatedUsers.findIndex(
                user => user.id === payload.id
            );
            filteredUpdatedUsers[pos] = payload;
            return { ...state, users: filteredUpdatedUsers };

        case types.REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(({ id }) => id !== payload)
            };

        default:
            return state;
    }
}
