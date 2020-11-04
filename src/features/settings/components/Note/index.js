import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtButton,
    DefaultLayout,
    SelectPickerField
} from '@/components';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import {
    NOTES_FORM,
    NOTES_EDIT,
    NOTES_FIELD_MODAL_TYPES as MODAL_TYPES,
    NOTES_ADD
} from '../../constants';
import { alertMe, BUTTON_COLOR, MAX_LENGTH } from '@/constants';

interface IProps {
    navigation: any;
    type: any;
    onFirstTimeCreateNote: any;
    createNote: Function;
    updateNote: Function;
    getNotesLoading: Boolean;
    removeNote: Function;
    locale: any;
    noteId: Number;
    noteLoading: any;
    handleSubmit: Function;
}

export class Note extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { navigation, onFirstTimeCreateNote } = this.props;

        !onFirstTimeCreateNote
            ? goBack(MOUNT, navigation)
            : goBack(MOUNT, navigation, { route: ROUTES.MAIN_EXPENSES });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(NOTES_FORM, field, value));
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

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            getNotesLoading,
            type,
            onFirstTimeCreateNote
        } = this.props;

        let categoryRefs = {};

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => {
                        !onFirstTimeCreateNote
                            ? navigation.goBack(null)
                            : navigation.navigate(ROUTES.MAIN_EXPENSES);
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
                    is: getNotesLoading
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

                    <Field
                        name="notes"
                        component={InputField}
                        hint={Lng.t('notes.description', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={100}
                        autoCorrect={true}
                        refLinkFn={ref => {
                            categoryRefs.description = ref;
                        }}
                    />
                </View>
            </DefaultLayout>
        );
    }
}

export default Note;
