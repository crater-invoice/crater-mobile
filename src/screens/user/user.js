import React, { Component } from 'react';
import { Field, change } from 'redux-form';
import { pick, find, values } from 'lodash';
import t from 'locales/use-translation';
import { IProps, IStates } from './user-type';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { styles } from './user-styles';
import { alertMe, hasValue, KEYBOARD_TYPE } from '@/constants';
import { USER_FORM, USER_FIELDS as FIELD } from 'modules/users/constants';
import {
    DefaultLayout,
    InputField,
    ActionButton,
    View,
    Text,
    CheckBox,
    Label,
    SelectField
} from '@/components';
import {
    addUser,
    updateUser,
    removeUser,
    fetchSingleUser
} from 'modules/users/actions';
import { IMAGES } from '@/assets';
let userRefs = {};
export default class User extends Component<IProps, IStates> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
        this.loadData();
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    loadData = () => {
        const { isEditScreen, userId, dispatch } = this.props;

        if (isEditScreen) {
            const onSuccess = user => {
                this.setFormField(`user`, user);
            };
            dispatch(fetchSingleUser({ id: userId, onSuccess }));
            return;
        }
    };

    onSave = ({ user }) => {
        const {
            isCreateScreen,
            dispatch,
            navigation,
            loading,
            userId,
            handleSubmit
        } = this.props;

        if (loading) {
            return;
        }

        const params = user;

        isCreateScreen
            ? dispatch(addUser({ params, navigation }))
            : dispatch(updateUser({ params, userId, navigation }));
    };

    removeUser = () => {
        const { navigation, userId, dispatch } = this.props;
        function alreadyUsedAlert() {
            alertMe({
                title: t('users.text_already_used')
            });
        }

        function confirmationAlert(remove) {
            alertMe({
                title: t('alert.title'),
                desc: t('users.text_alert_description'),
                showCancel: true,
                okPress: remove
            });
        }

        confirmationAlert(() =>
            dispatch(
                removeUser({
                    id: userId,
                    onSuccess: val =>
                        val
                            ? navigation.navigate(ROUTES.USERS)
                            : alreadyUsedAlert()
                })
            )
        );
    };

    setFormField = (field, value) => {
        const { dispatch } = this.props;
        dispatch(change(USER_FORM, field, value));
    };

    navigateToRole = () => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CREATE_ROLE, {
            type: 'ADD',
            onSelect: item => {
                this.setFormField(`user.${FIELD.ROLE}`, item.name);
            }
        });
    };
    render() {
        const {
            navigation,
            handleSubmit,
            loading,
            isEditScreen,
            isAllowToEdit,
            isAllowToDelete,
            roles,
            fetchRoles,
            formValues
        } = this.props;
        const disabled = !isAllowToEdit;

        const getTitle = () => {
            let title = 'header.addUser';

            if (isEditScreen && !isAllowToEdit) title = 'header.viewUser';
            if (isEditScreen && isAllowToEdit) title = 'header.editUser';

            return t(title);
        };

        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSave),
                show: isAllowToEdit,
                loading: loading
            },
            {
                label: 'button.remove',
                onPress: this.removeUser,
                bgColor: 'btn-danger',
                show: isEditScreen && isAllowToDelete,
                loading: loading
            }
        ];

        const headerProps = {
            leftIconPress: () => navigation.goBack(null),
            title: getTitle(),
            placement: 'center',
            ...(isAllowToEdit && {
                rightIcon: 'save',
                rightIconProps: { solid: true },
                rightIconPress: handleSubmit(this.onSave)
            })
        };

        return (
            <DefaultLayout
                headerProps={headerProps}
                bottomAction={<ActionButton buttons={bottomAction} />}
            >
                <Field
                    name={`user.${FIELD.NAME}`}
                    component={InputField}
                    isRequired
                    hint={t('users.text_name')}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: () => userRefs.email.focus()
                    }}
                />

                <Field
                    name={`user.${FIELD.EMAIL}`}
                    component={InputField}
                    hint={t('users.email')}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: KEYBOARD_TYPE.EMAIL,
                        onSubmitEditing: () => userRefs.password.focus()
                    }}
                    isRequired
                    refLinkFn={ref => (userRefs.email = ref)}
                    disabled={disabled}
                />

                <Field
                    name={`user.${FIELD.PASSWORD}`}
                    component={InputField}
                    hint={t('users.password')}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            userRefs.phone.focus();
                        }
                    }}
                    secureTextEntry
                    secureTextIconContainerStyle={styles.eyeIcon}
                    disabled={disabled}
                    refLinkFn={ref => {
                        userRefs.password = ref;
                    }}
                    isRequired
                    minCharacter={8}
                />

                <Field
                    name={`user.${FIELD.PHONE}`}
                    component={InputField}
                    hint={t('users.phone')}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: KEYBOARD_TYPE.PHONE
                    }}
                    refLinkFn={ref => (userRefs.phone = ref)}
                    disabled={disabled}
                />

                <Field
                    name={`user.${FIELD.ROLE}`}
                    items={roles}
                    apiSearch
                    hasPagination
                    isRequired
                    getItems={fetchRoles}
                    selectedItem={formValues?.user?.role}
                    displayName="title"
                    component={SelectField}
                    label={t('users.role')}
                    icon={'align-center'}
                    createActionRouteName={ROUTES.CREATE_ROLE}
                    rightIconPress={this.navigateToRole}
                    placeholder={
                        formValues?.user?.role ?? t('users.rolePlaceholder')
                    }
                    navigation={navigation}
                    compareField="id"
                    onSelect={item => {
                        this.setFormField(`user.${FIELD.ROLE}`, item.name);
                    }}
                    headerProps={{
                        title: t('users.roles')
                    }}
                    emptyContentProps={{
                        contentType: 'roles',
                        image: IMAGES.EMPTY_CUSTOMERS
                    }}
                    isEditable={!disabled}
                    fakeInputProps={{ disabled }}
                    refLinkFn={ref => (userRefs.role = ref)}
                />
            </DefaultLayout>
        );
    }
}
