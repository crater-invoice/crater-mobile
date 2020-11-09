import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import Note from '../../components/Note';
import { NOTES_FORM, NOTES_ADD, NOTES_TYPE_VALUE } from '../../constants';
import * as noteAction from '../../actions';
import { validate } from './validations';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale },
        settings: {
            loading: {
                getNotesLoading,
            }
        }
    } = state

    const noteType = navigation.getParam('note', {});
    const type = navigation.getParam('type', NOTES_ADD)
    let onFirstTimeCreateNote = navigation.getParam('onSelect', null)

    return {
        noteLoading: getNotesLoading,
        type,
        locale,
        onFirstTimeCreateNote,
        formValues: getFormValues(NOTES_FORM)(state) || {},
        noteId: noteType && noteType.id,
        initialValues: {
            type: NOTES_TYPE_VALUE.INVOICE,
            ...noteType
        }
    };
}

const mapDispatchToProps = {
    getNotes: noteAction.getNotes,
    createNote: noteAction.createNote,
    removeNote: noteAction.removeNote,
    updateNote: noteAction.updateNote
};
//  Redux Forms
const NoteSearchReduxForm = reduxForm({
    form: NOTES_FORM,
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
