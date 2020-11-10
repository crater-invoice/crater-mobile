import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtButton,
    DefaultLayout,
    SelectPickerField,
    PlaceholderModal
} from '@/components';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import {
    NOTE_FORM,
    NOTES_EDIT,
    NOTES_FIELD_MODAL_TYPES as MODAL_TYPES,
    NOTES_ADD
} from '../../constants';
import { alertMe, BUTTON_COLOR, hasValue, isArray } from '@/constants';

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
    noteFields: Array<any>;
}

export default class Note extends React.Component<IProps> {
    modalReference: any;
    constructor(props) {
        super(props);
        this.modalReference = React.createRef();
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
        const { type, getCreateNote, getNoteDetail, noteDetail } = this.props;

        if (type === NOTES_ADD) {
            getCreateNote({
                onSuccess: () => this.setState({ isLoading: false })
            });
            return;
        }

        if (type === NOTES_EDIT) {
            getNoteDetail({
                type: noteDetail?.type,
                onSuccess: () => this.setState({ isLoading: false })
            });
            return;
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(NOTE_FORM, field, value));
    };

    onSubmitNote = note => {
        const {
            type,
            createNote,
            updateNote,
            navigation,
            getNotesLoading
        } = this.props;

        if (!getNotesLoading) {
            if (type === NOTES_ADD)
                createNote({
                    params: note,
                    onSuccess: () => {
                        navigation.goBack(null);
                    },
                    navigation
                });
            else {
                updateNote({
                    note,
                    onResult: () => navigation.goBack(null),
                    navigation
                });
            }
        }
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

    BOTTOM_ACTION = handleSubmit => {
        const { locale, type, noteLoading } = this.props;

        return (
            <View
                style={[
                    styles.submitButton,
                    type === NOTES_EDIT && styles.multipleButton
                ]}
            >
                <CtButton
                    onPress={handleSubmit(this.onSubmitNote)}
                    btnTitle={Lng.t('button.save', { locale })}
                    buttonContainerStyle={type === NOTES_EDIT && styles.flex}
                    containerStyle={styles.btnContainerStyle}
                    loading={noteLoading}
                />

                {type === NOTES_EDIT && (
                    <CtButton
                        onPress={this.removeNote}
                        btnTitle={Lng.t('button.remove', { locale })}
                        buttonColor={BUTTON_COLOR.DANGER}
                        containerStyle={styles.btnContainerStyle}
                        buttonContainerStyle={styles.flex}
                        loading={noteLoading}
                    />
                )}
            </View>
        );
    };

    insertField = value => {
        const { formValues } = this.props;
        let notes = '';

        if (hasValue(formValues?.notes)) {
            notes = `${formValues?.notes}{${value}}`;
        } else {
            notes = `{${value}}`;
        }

        this.setFormField('notes', notes);
    };

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            type,
            noteFields
        } = this.props;
        const { isLoading } = this.state;

        let categoryRefs = {};
        const hasFields = isArray(noteFields);

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => {
                        navigation.goBack(null);
                    },
                    title:
                        type === NOTES_EDIT
                            ? Lng.t('header.editNote', { locale })
                            : Lng.t('header.addNote', { locale }),
                    placement: 'center',
                    rightIcon: 'save',
                    rightIconProps: {
                        solid: true
                    },
                    rightIconPress: handleSubmit(this.onSubmitNote)
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: isLoading
                }}
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
                            autoCorrect: true,
                            autoFocus: true,
                            onSubmitEditing: () => {
                                categoryRefs.description.focus();
                            }
                        }}
                        validationStyle={styles.inputFieldValidation}
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
                    />

                    <View style={styles.noteContainer}>
                        <View>
                            <Text style={styles.noteHintStyle}>
                                {Lng.t('notes.description', { locale })}
                            </Text>
                        </View>
                        <View>
                            {hasFields && (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.modalReference?.onToggle?.();
                                    }}
                                >
                                    <Text style={styles.insertFields}>
                                        {Lng.t('notes.insertFields', {
                                            locale
                                        })}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <Field
                        name="notes"
                        component={InputField}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            multiline: true
                        }}
                        defaultHeight={120}
                        autoHeight
                        autoCorrect={true}
                        refLinkFn={ref => {
                            categoryRefs.description = ref;
                        }}
                    />
                </View>

                {hasFields && (
                    <PlaceholderModal
                        reference={ref => (this.modalReference = ref)}
                        items={noteFields}
                        onSelect={this.insertField}
                    />
                )}
            </DefaultLayout>
        );
    }
}
