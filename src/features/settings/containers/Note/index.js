import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import Note from '../../components/Note';
import { NOTE_FORM, NOTES_TYPE_VALUE } from '../../constants';
import * as noteAction from '../../actions';
import { validate } from './validations';
import { hasValue } from '@/constants';
import { commonSelector, permissionSelector } from 'stores/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const noteDetail = navigation.getParam('note', {});
    const onSelect = navigation.getParam('onSelect', null);
    const selectedModalType = navigation.getParam('modalType', null);

    return {
        noteLoading: state.settings?.loading?.getNotesLoading,
        formValues: getFormValues(NOTE_FORM)(state) || {},
        noteId: noteDetail?.id,
        customFields: state.settings?.customFields,
        noteDetail,
        onSelect,
        selectedModalType,
        ...permissionSelector(navigation),
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
    ...noteAction
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
