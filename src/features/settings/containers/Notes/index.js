import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as notesAction from '../../actions';
import Notes from '../../components/Notes';
import { NOTES_SEARCH } from '../../constants';

const mapStateToProps = ({ global, settings }) => ({
    locale: global?.locale,
    notes: settings?.notes
});

const mapDispatchToProps = {
    getNotes: notesAction.getNotes
};

//  Redux Forms
const NotesSearchReduxForm = reduxForm({
    form: NOTES_SEARCH
})(Notes);

//  connect
const NotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesSearchReduxForm);

NotesContainer.navigationOptions = () => ({
    header: null
});

export default NotesContainer;
