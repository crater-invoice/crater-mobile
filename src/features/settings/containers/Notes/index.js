import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as notesAction from '../../actions';
import Notes from '../../components/Notes';
import { NOTES_SEARCH } from '../../constants';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    notes: state.settings?.notes,
    ...commonSelector(state)
});

const mapDispatchToProps = {
    getNotes: notesAction.getNotes
};

const NotesSearchReduxForm = reduxForm({
    form: NOTES_SEARCH
})(Notes);

const NotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesSearchReduxForm);

NotesContainer.navigationOptions = () => ({
    header: null
});

export default NotesContainer;
