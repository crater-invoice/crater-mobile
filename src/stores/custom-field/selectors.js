import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';
import {colors} from '@/styles';
import moment from 'moment';

const customFieldStore = state => state?.customField;

export const customFieldsSelector = createSelector(
  customFieldStore,
  store => (!isEmpty(store?.customFields) ? store?.customFields : [])
);

export const formattedCustomFieldsSelector = createSelector(
  state => state.customField.customFields,
  state => state.common.theme,
  (customFields, theme) => {
    if (isEmpty(customFields)) return [];

    return customFields.map(field => {
      const {name, type, model_type, created_at} = field;
      return {
        title: name,
        subtitle: {
          label: type,
          ...(theme.mode === 'dark'
            ? {
                labelTextColor: colors.white4,
                labelOutlineColor: colors.white4
              }
            : {
                labelBgColor: colors.gray2,
                labelTextColor: colors.darkGray2
              })
        },
        rightTitle: model_type,
        rightSubtitle: moment(created_at).format('DD MMM YYYY'),
        fullItem: field
      };
    });
  }
);

export const loadingSelector = createSelector(
  customFieldStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
