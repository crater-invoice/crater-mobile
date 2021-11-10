import {isEmpty} from '@/constants';
import {
  SETTINGS_TRIGGER_SPINNER,
  SET_CUSTOM_FIELDS,
  CREATE_FROM_CUSTOM_FIELDS,
  REMOVE_FROM_CUSTOM_FIELDS,
  UPDATE_FROM_CUSTOM_FIELDS
} from '../constants';

const initialState = {
  loading: {
    // item
    getSettingItemLoading: false,
    setSettingItemLoading: false,
    editSettingItemLoading: false,

    // Custom Fields
    customFieldLoading: false,
    getCustomFieldLoading: false,
    removeCustomFieldLoading: false
  },
  customFields: []
};

export default function settingReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case SETTINGS_TRIGGER_SPINNER:
      return {...state, loading: {...payload}};

    case SET_CUSTOM_FIELDS:
      if (!payload.fresh) {
        return {
          ...state,
          customFields: [...state.customFields, ...payload.customFields]
        };
      }
      return {...state, customFields: payload.customFields};

    case CREATE_FROM_CUSTOM_FIELDS:
      return {
        ...state,
        customFields: [...[payload.customField], ...state.customFields]
      };

    case REMOVE_FROM_CUSTOM_FIELDS: {
      const customFieldID = payload.id;

      const filterCustomField = state.customFields.filter(
        customField => customField.id !== customFieldID
      );

      return {
        ...state,
        customFields: filterCustomField
      };
    }

    case UPDATE_FROM_CUSTOM_FIELDS: {
      const customFieldData = payload.customField;
      const customFieldsList = [];

      if (state.customFields) {
        state.customFields.map(customfield => {
          const {id} = customfield;
          let value = customfield;

          if (id === customFieldData.id) {
            value = {
              ...customFieldData
            };
          }
          customFieldsList.push(value);
        });
      }

      return {
        ...state,
        customFields: customFieldsList
      };
    }

    default:
      return state;
  }
}
