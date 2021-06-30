import { createSelector } from 'reselect';
import { capitalize, hasLength } from '@/constants';
import { BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR } from '@/utils';

const formatEstimateItems = (estimates, theme) =>
    estimates.map(item => {
        const {
            estimate_number,
            user: { name, currency } = {},
            status,
            formattedEstimateDate,
            total
        } = item;

        return {
            title: name,
            subtitle: {
                title: estimate_number,
                labelTextColor: BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode],
                ...(theme.mode === 'dark'
                    ? {
                          label: capitalize(status),
                          labelOutlineColor:
                              BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
                      }
                    : {
                          label: status,
                          labelBgColor:
                              BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
                      })
            },
            amount: total,
            currency,
            rightSubtitle: formattedEstimateDate,
            fullItem: item
        };
    });

const getDraftEstimatesState = createSelector(
    [state => state.estimates, state => state.theme],
    (estimates, theme) =>
        !hasLength(estimates) ? [] : formatEstimateItems(estimates, theme)
);

const getSentEstimatesState = createSelector(
    [state => state.estimates, state => state.theme],
    (estimates, theme) =>
        !hasLength(estimates) ? [] : formatEstimateItems(estimates, theme)
);

const getAllEstimatesState = createSelector(
    [state => state.estimates, state => state.theme],
    (estimates, theme) =>
        !hasLength(estimates) ? [] : formatEstimateItems(estimates, theme)
);

export { getDraftEstimatesState, getSentEstimatesState, getAllEstimatesState };
