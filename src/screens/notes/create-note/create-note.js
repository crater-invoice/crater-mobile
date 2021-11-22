import React, {Component} from 'react';
import {Field, initialize} from 'redux-form';
import {pick} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-note-type.d';
import {alertMe, hasTextLength, hasValue} from '@/constants';
import {secondaryHeader} from 'utils/header';
import {CREATE_NOTE_FORM} from 'stores/note/types';
import {NOTE_TYPES} from 'stores/note/helpers';
import {
  DefaultLayout,
  BaseInput,
  BaseButtonGroup,
  BaseButton,
  BaseDropdownPicker,
  Editor,
  PLACEHOLDER_TYPES as TYPES
} from '@/components';
import {
  addNote,
  updateNote,
  removeNote,
  fetchSingleNote,
  fetchNoteInitialDetails
} from 'stores/note/actions';

export default class CreateNote extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isEditScreen, id, dispatch} = this.props;
    if (isEditScreen) {
      dispatch(fetchSingleNote(id, note => this.setInitialData(note)));
      return;
    }

    dispatch(
      fetchNoteInitialDetails(() =>
        this.setState({isFetchingInitialData: false})
      )
    );
  };

  setInitialData = note => {
    const {dispatch} = this.props;
    const data = pick(note, ['name', 'notes', 'type']);
    dispatch(initialize(CREATE_NOTE_FORM, data));
    this.setState({isFetchingInitialData: false});
  };

  onSave = values => {
    const {id, isCreateScreen, navigation, dispatch, route} = this.props;
    const {isFetchingInitialData} = this.state;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    const onSuccess = res => {
      const onSelect = route?.params?.onSelect;
      onSelect?.(res);
      navigation.goBack(null);
    };

    const params = {id, params: values, onSuccess};

    isCreateScreen ? dispatch(addNote(params)) : dispatch(updateNote(params));
  };

  removeNote = () => {
    const {id, dispatch} = this.props;

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('notes.alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() => dispatch(removeNote(id)));
  };

  render() {
    const {
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isSaving,
      isDeleting,
      handleSubmit,
      selectedModalType,
      formValues
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: handleSubmit(this.onSave)
    });

    const types = [TYPES.PREDEFINE_CUSTOMER, TYPES.CUSTOMER];
    if (hasTextLength(formValues?.type)) {
      types.push(formValues?.type);
    }

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          show={isAllowToEdit}
          loading={isSaving}
          disabled={isFetchingInitialData || isDeleting}
          onPress={handleSubmit(this.onSave)}
        >
          {t('button.save')}
        </BaseButton>
        <BaseButton
          type="danger"
          show={isEditScreen && isAllowToDelete}
          loading={isDeleting}
          disabled={isFetchingInitialData || isSaving}
          onPress={this.removeNote}
        >
          {t('button.remove')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="name"
          component={BaseInput}
          isRequired
          hint={t('notes.title')}
          disabled={disabled}
        />

        <Field
          name="type"
          component={BaseDropdownPicker}
          label={t('notes.type')}
          fieldIcon="align-center"
          items={NOTE_TYPES}
          defaultPickerOptions={{
            label: t('notes.model_placeholder'),
            value: ''
          }}
          isRequired
          disabled={disabled || hasValue(selectedModalType)}
        />

        <Editor
          {...this.props}
          types={types}
          name="notes"
          label="notes.description"
          isRequired
          showPreview={isEditScreen}
        />
      </DefaultLayout>
    );
  }
}
