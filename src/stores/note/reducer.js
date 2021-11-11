import * as types from './types';

const initialState = {
  notes: [],
  isSaving: false,
  isDeleting: false
};

export default function noteReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_NOTES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          notes: payload.notes,
          isSaving: false,
          isDeleting: false
        };
      }
      return {
        ...state,
        notes: [...state.notes, ...payload.notes]
      };

    case types.ADD_NOTE_SUCCESS:
      return {
        ...state,
        notes: [...[payload], ...state.notes]
      };

    case types.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === payload.id ? payload : note
        )
      };

    case types.REMOVE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
