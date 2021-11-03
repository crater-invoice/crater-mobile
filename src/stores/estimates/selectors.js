import {createSelector} from 'reselect';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';
import {capitalize, isEmpty} from '@/constants';

export const formatEstimateItems = (estimates, theme) => {
  if (isEmpty(estimates)) {
    return [];
  }
  return estimates.map(item => {
    const {
      estimate_number,
      customer: {name, currency} = {},
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
              labelOutlineColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
            }
          : {
              label: status,
              labelBgColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
            })
      },
      amount: total,
      currency,
      rightSubtitle: formattedEstimateDate,
      fullItem: item
    };
  });
};

export const estimateSelector = createSelector(
  [state => state.estimates.estimates, state => state.common?.theme],
  (estimates, theme) => formatEstimateItems(estimates, theme)
);

export const loadingSelector = createSelector(
  state => state?.estimates,
  estimates => ({
    isSaving: estimates?.isSaving,
    isDeleting: estimates?.isDeleting,
    isLoading: estimates?.isLoading
  })
);
