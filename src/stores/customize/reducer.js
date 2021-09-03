import * as types from './types';
import {isEmpty} from '@/constants';

const initialState = {
  loading: {
    // customize
    getCustomizeLoading: false,
    customizeLoading: false
  },
  customizes: null
};

export default function customizeReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SET_CUSTOMIZE_SETTINGS:
      const {customizes} = payload;

      return {...state, customizes};
    default:
      return state;
  }
}
