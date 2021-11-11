import {SETTINGS_TRIGGER_SPINNER} from '../constants';

const initialState = {
  loading: {
    // item
    getSettingItemLoading: false,
    setSettingItemLoading: false,
    editSettingItemLoading: false
  }
};

export default function settingReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case SETTINGS_TRIGGER_SPINNER:
      return {...state, loading: {...payload}};

    default:
      return state;
  }
}
