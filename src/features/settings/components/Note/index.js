import React from 'react';
import { View } from 'react-native';
import { Field, SubmissionError } from 'redux-form';
import styles from './styles';
import {
    InputField,
    DefaultLayout,
    SelectPickerField,
    Editor,
    PLACEHOLDER_TYPES as TYPES,
    ActionButton
} from '@/components';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import { alertMe, hasTextLength, hasValue } from '@/constants';
import {
    NOTES_FIELD_MODAL_TYPES as MODAL_TYPES,
    NOTES_ADD
} from '../../constants';

interface IProps {
    navigation: any;
    type: any;
    createNote: Function;
    updateNote: Function;
    getNotesLoading: Boolean;
    removeNote: Function;
    locale: any;
    noteId: Number;
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
        this.state = { isLoading: true };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
        this.getCustomFields();
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    getCustomFields = () => {
        const { type, getCreateNote, isEditScreen, getNoteDetail } = this.props;

        if (type === NOTES_ADD) {
            getCreateNote({
                onSuccess: () => this.setState({ isLoading: false })
            });
            return;
        }

        if (isEditScreen) {
            getNoteDetail({
                onSuccess: () => this.setState({ isLoading: false })
            });
            return;
        }
    };

    onSubmit = note => {
        const {
            type,
            createNote,
            updateNote,
            navigation,
            onSelect
        } = this.props;

        if (this.state.isLoading) {
            return;
        }

        if (!hasValue(note?.notes) || !hasTextLength(note?.notes)) {
            throw new SubmissionError({
                notes: 'validation.required'
            });
        }

        const params = {
            params: note,
            onSuccess: res => {
                onSelect?.(res);
                navigation.goBack(null);
            }
        };

        type === NOTES_ADD ? createNote(params) : updateNote(params);
    };

    removeNote = () => {
        const { removeNote, navigation, locale, noteId } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('notes.alertDescription', { locale }),
            showCancel: true,
            okPress: () =>
                removeNote({
                    id: noteId,
                    navigation,
                    onFail: () => {
                        alertMe({
                            title: `${name} ${Lng.t('notes.alreadyUsed', {
                                locale
                            })}`
                        });
                    },
                    onResult: () => {
                        navigation.goBack(null);
                    }
                })
        });
    };

    getCustomFieldTypes = () => {
        const { formValues } = this.props;
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
            locale,
            type,
            selectedModalType,
            noteLoading,
            isEditScreen,
            isAllowToEdit,
            isAllowToDelete
        } = this.props;

        const { isLoading } = this.state;
        const disabled = !isAllowToEdit;
        const types = this.getCustomFieldTypes();

        const getTitle = () => {
            let title = 'header.addNote';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewNote';
            if (isEditScreen && isAllowToEdit) title = 'header.editNote';

            return Lng.t(title, { locale });
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
                        rightIconProps: { solid: true },
                        rightIconPress: handleSubmit(this.onSubmit)
                    })
                }}
                bottomAction={
                    <ActionButton locale={locale} buttons={bottomAction} />
                }
                loadingProps={{ is: isLoading }}
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t('notes.title', { locale })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true
                        }}
                        validationStyle={styles.inputFieldValidation}
                        disabled={disabled}
                    />

                    <Field
                        name="type"
                        component={SelectPickerField}
                        label={Lng.t('notes.type', {
                            locale
                        })}
                        fieldIcon="align-center"
                        items={MODAL_TYPES}
                        defaultPickerOptions={{
                            label: Lng.t('notes.modelPlaceholder', {
                                locale
                            }),
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
                </View>
            </DefaultLayout>
        );
    }
}
