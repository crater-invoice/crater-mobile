import { createSelector } from 'reselect';
import { isEmpty } from '@/constants';
import { colors } from '@/styles';
import moment from 'moment';

const getCustomFieldsState = createSelector(
    [state => state.customFields, state => state.theme],
    (customFields, theme) =>
        isEmpty(customFields)
            ? []
            : customFields.map(field => {
                  const { name, type, model_type, created_at } = field;
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
              })
);

export { getCustomFieldsState };
