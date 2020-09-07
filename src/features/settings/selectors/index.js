import { createSelector } from 'reselect';
import { hasLength } from '@/api/global';
import { colors } from '@/styles/colors';
import moment from 'moment';

const getCustomFieldsState = createSelector(
    customFields => customFields,
    customFields =>
        !hasLength(customFields)
            ? []
            : customFields.map(field => {
                  const { name, type, model_type, created_at } = field;
                  return {
                      title: name,
                      subtitle: {
                          label: type,
                          labelBgColor: colors.gray2,
                          labelTextColor: colors.darkGray2
                      },
                      rightTitle: model_type,
                      rightSubtitle: moment(created_at).format('DD MMM YYYY'),
                      fullItem: field
                  };
              })
);

export { getCustomFieldsState };
