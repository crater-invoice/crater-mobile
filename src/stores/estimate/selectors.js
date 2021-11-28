import {createSelector} from 'reselect';
import {BADGE_STATUS_BG_COLOR, BADGE_STATUS_TEXT_COLOR} from '@/utils';
import {capitalize, isEmpty} from '@/constants';

const estimateStore = state => state?.estimate;

export const formatEstimateItems = (estimates, theme) => {
  if (isEmpty(estimates)) {
    return [];
  }
  return estimates.map(item => {
    const {
      estimate_number,
      customer: {name, currency} = {},
      status,
      formatted_estimate_date,
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
      rightSubtitle: formatted_estimate_date,
      fullItem: item
    };
  });
};

export const estimateSelector = createSelector(
  [state => state.estimate.estimates, state => state.common?.theme],
  (estimates, theme) => formatEstimateItems(estimates, theme)
);

export const loadingSelector = createSelector(
  estimateStore,
  store => ({
    isSaving: store?.isSaving,
    isDeleting: store?.isDeleting,
    isLoading: store?.isLoading
  })
);

export const templatesSelector = createSelector(
  estimateStore,
  store => store.estimateTemplates
);
