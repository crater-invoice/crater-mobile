import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Notes from './list-notes';
import {commonSelector} from 'stores/common/selectors';
import {NOTES_FORM} from 'stores/note/types';
import {notesSelector} from 'stores/note/selectors';

const mapStateToProps = state => ({
  notes: notesSelector(state),
  ...commonSelector(state)
});

const NotesForm = reduxForm({form: NOTES_FORM})(Notes);

export const NotesContainer: any = connect(mapStateToProps)(NotesForm);
