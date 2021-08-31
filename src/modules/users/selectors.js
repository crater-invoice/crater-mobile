import { createSelector } from 'reselect';
import { isEmpty } from '@/constants';

const formattedUsers = users =>
    users.map(user => ({
        title: user?.name,
        fullItem: user,
        subtitle: {
            title: user?.email || ''
        },
        leftAvatar: user?.name.toUpperCase().charAt(0)
    }));

export const usersSelector = createSelector(
    users => users,
    users => (!isEmpty(users) ? formattedUsers(users) : [])
);
