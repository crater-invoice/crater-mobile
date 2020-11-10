import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import Note from '../../components/Note';
import { NOTE_FORM, NOTES_ADD, NOTES_TYPE_VALUE } from '../../constants';
import * as noteAction from '../../actions';
import { validate } from './validations';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale },
        settings: {
            noteFields,
            loading: { getNotesLoading }
        }
    } = state;

    const noteDetail = navigation.getParam('note', {});
    const type = navigation.getParam('type', NOTES_ADD);

    return {
        noteLoading: getNotesLoading,
        type,
        locale,
        formValues: getFormValues(NOTE_FORM)(state) || {},
        noteId: noteDetail?.id,
        noteFields,
        noteDetail,
        initialValues: {
            type: NOTES_TYPE_VALUE.INVOICE,
            ...noteDetail
        }
    };
};

const mapDispatchToProps = {
    getNotes: noteAction.getNotes,
    getCreateNote: noteAction.getCreateNote,
    createNote: noteAction.createNote,
    removeNote: noteAction.removeNote,
    updateNote: noteAction.updateNote,
    getNoteDetail: noteAction.getNoteDetail
};
//  Redux Forms
const NoteSearchReduxForm = reduxForm({
    form: NOTE_FORM,
    validate
})(Note);

//  connect
const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteSearchReduxForm);

NoteContainer.navigationOptions = () => ({
    header: null
});

export default NoteContainer;
