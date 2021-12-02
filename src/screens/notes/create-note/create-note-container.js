import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import CreateNote from './create-note';
import {hasValue} from '@/constants';
import {validate} from 'stores/note/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/note/selectors';
import {CREATE_NOTE_FORM} from 'stores/note/types';
import {customFieldsSelector} from 'stores/custom-field/selectors';

const mapStateToProps = (state, {route}) => {
  const selectedModalType = route?.params?.modalType;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...permissionSelector(route),
    formValues: getFormValues(CREATE_NOTE_FORM)(state) || {},
    customFields: customFieldsSelector(state),
    selectedModalType,
    initialValues: {
      name: null,
      notes: null,
      type: !hasValue(selectedModalType) ? 'Invoice' : selectedModalType
    }
  };
};

const CreateNoteForm = reduxForm({form: CREATE_NOTE_FORM, validate})(
  CreateNote
);

export const CreateNoteContainer = connect(mapStateToProps)(CreateNoteForm);
