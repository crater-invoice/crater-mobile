import {MORE_TRIGGER_SPINNER} from '../constants';

const initialState = {
  loading: {
    getMailConfigLoading: false
  }
};

export default function moreReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case MORE_TRIGGER_SPINNER:
      return {...state, loading: {...state.loading, ...payload}};

    default:
      return state;
  }
}
