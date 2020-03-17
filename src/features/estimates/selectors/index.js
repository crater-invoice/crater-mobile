import { createSelector } from 'reselect'
import { hasLength } from '../../../api/global';
import {
    ESTIMATES_STATUS_BG_COLOR,
    ESTIMATES_STATUS_TEXT_COLOR
} from '../constants';

const formatEstimateItems = (estimates) => estimates.map((item) => {
    const {
        estimate_number,
        user: { name, currency } = {},
        status,
        formattedEstimateDate,
        total,
    } = item;

    return {
        title: name,
        subtitle: {
            title: estimate_number,
            label: status,
            labelBgColor: ESTIMATES_STATUS_BG_COLOR[status],
            labelTextColor: ESTIMATES_STATUS_TEXT_COLOR[status],
        },
        amount: total,
        currency,
        rightSubtitle: formattedEstimateDate,
        fullItem: item,
    };
});


const getDraftEstimatesState = createSelector(
    estimates => estimates,
    estimates => !hasLength(estimates) ? [] : formatEstimateItems(estimates)
);

const getSentEstimatesState = createSelector(
    estimates => estimates,
    estimates => !hasLength(estimates) ? [] : formatEstimateItems(estimates)
);

const getAllEstimatesState = createSelector(
    estimates => estimates,
    estimates => !hasLength(estimates) ? [] : formatEstimateItems(estimates)
);

export {
    getDraftEstimatesState,
    getSentEstimatesState,
    getAllEstimatesState
}
