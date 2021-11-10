import {createSelector} from 'reselect';
import {isEmpty} from '@/constants';

const notesStore = state => state?.notes;

export const notesSelector = createSelector(
  notesStore,
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
  notesStore,
  store => ({isSaving: store?.isSaving, isDeleting: store?.isDeleting})
);
