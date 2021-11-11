import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const noteStore = state => state?.note;

export const notesSelector = createSelector(
  noteStore,
  store => {
    if (isEmpty(store?.notes)) return [];
    return store.notes.map(note => ({
      title: note.name,
      rightTitle: note.type,
      fullItem: note
    }));
  }
);

export const notesTypeSelector = notes => {
  if (isEmpty(notes)) return [];
  return notes.map(note => ({
    title: note.title,
    fullItem: note.fullItem
  }));
};

export const loadingSelector = createSelector(
  noteStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
