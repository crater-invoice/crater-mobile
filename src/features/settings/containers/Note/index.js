import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import Note from '../../components/Note';
import {
    NOTE_FORM,
    NOTES_ADD,
    NOTES_TYPE_VALUE,
    NOTES_EDIT
} from '../../constants';
import * as noteAction from '../../actions';
import { validate } from './validations';
import { hasValue } from '@/constants';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        settings: {
            customFields,
            loading: { getNotesLoading }
        }
    } = state;

    const noteDetail = navigation.getParam('note', {});
    const type = navigation.getParam('type', NOTES_ADD);
    const onSelect = navigation.getParam('onSelect', null);
    const selectedModalType = navigation.getParam('modalType', null);

    const isEditScreen = type === NOTES_EDIT;
    const isAllowToEdit = isEditScreen
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditScreen
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    return {
        noteLoading: getNotesLoading,
        type,
        formValues: getFormValues(NOTE_FORM)(state) || {},
        noteId: noteDetail?.id,
        customFields,
        noteDetail,
        onSelect,
        selectedModalType,
        isEditScreen,
        isAllowToEdit,
        isAllowToDelete,
        ...commonSelector(state),
        initialValues: {
            type: !hasValue(selectedModalType)
                ? NOTES_TYPE_VALUE.INVOICE
                : selectedModalType,
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

const NoteSearchReduxForm = reduxForm({
    form: NOTE_FORM,
    validate
})(Note);

const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteSearchReduxForm);

NoteContainer.navigationOptions = () => ({
    header: null
});

export default NoteContainer;
