import React from 'react';
import {Field} from 'redux-form';
import styles from './styles';
import {
  InputField,
  DefaultLayout,
  SelectPickerField,
  Editor,
  PLACEHOLDER_TYPES as TYPES,
  ActionButton
} from '@/components';
import t from 'locales/use-translation';
import {alertMe, hasTextLength, hasValue} from '@/constants';
import {NOTES_FIELD_MODAL_TYPES as MODAL_TYPES} from '../../constants';

interface IProps {
  navigation: any;
  type: any;
  createNote: Function;
  updateNote: Function;
  getNotesLoading: Boolean;
  removeNote: Function;
  id: Number;
  noteLoading: any;
  handleSubmit: Function;
  dispatch: Function;
  formValues: any;
  getNoteDetail: Function;
  getCreateNote: Function;
  customFields: Array<any>;
}

export default class Note extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    this.getCustomFields();
  }

  getCustomFields = () => {
    const {getCreateNote, isEditScreen, getNoteDetail} = this.props;

    if (!isEditScreen) {
      getCreateNote({
        onSuccess: () => this.setState({isLoading: false})
      });
      return;
    }

    if (isEditScreen) {
      getNoteDetail({
        onSuccess: () => this.setState({isLoading: false})
      });
      return;
    }
  };

  onSubmit = note => {
    const {
      createNote,
      updateNote,
      navigation,
      onSelect,
      isCreateScreen
    } = this.props;

    if (this.state.isLoading || !hasTextLength(note?.notes)) {
      return;
    }

    const params = {
      params: note,
      onSuccess: res => {
        onSelect?.(res);
        navigation.goBack(null);
      }
    };

    isCreateScreen ? createNote(params) : updateNote(params);
  };

  removeNote = () => {
    const {removeNote, navigation, id} = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('notes.alertDescription'),
      showCancel: true,
      okPress: () => removeNote({id, navigation})
    });
  };

  getCustomFieldTypes = () => {
    const {formValues} = this.props;
    const types = [TYPES.PREDEFINE_CUSTOMER, TYPES.CUSTOMER];

    if (hasTextLength(formValues?.type)) {
      types.push(formValues?.type);
    }

    return types;
  };

  render() {
    const {
      navigation,
      handleSubmit,
      selectedModalType,
      noteLoading,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete
    } = this.props;

    const {isLoading} = this.state;
    const disabled = !isAllowToEdit;
    const types = this.getCustomFieldTypes();

    const getTitle = () => {
      let title = 'header.addNote';
      if (isEditScreen && !isAllowToEdit) title = 'header.viewNote';
      if (isEditScreen && isAllowToEdit) title = 'header.editNote';

      return t(title);
    };

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSubmit),
        show: isAllowToEdit,
        loading: noteLoading || isLoading
      },
      {
        label: 'button.remove',
        onPress: this.removeNote,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading: noteLoading || isLoading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: getTitle(),
          placement: 'center',
          ...(isAllowToEdit && {
            rightIcon: 'save',
            rightIconProps: {solid: true},
            rightIconPress: handleSubmit(this.onSubmit)
          })
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: isLoading}}
      >
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('notes.title')}
          inputFieldStyle={styles.inputFieldStyle}
          validationStyle={styles.inputFieldValidation}
          disabled={disabled}
        />

        <Field
          name="type"
          component={SelectPickerField}
          label={t('notes.type')}
          fieldIcon="align-center"
          items={MODAL_TYPES}
          defaultPickerOptions={{
            label: t('notes.modelPlaceholder'),
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
