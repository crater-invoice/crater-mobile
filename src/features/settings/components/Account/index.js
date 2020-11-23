// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { DefaultLayout, CtButton, InputField, CtDivider, FilePicker } from '@/components';
import { Field, change } from 'redux-form';
import Lng from '@/lang/i18n';
import { EDIT_ACCOUNT } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { headerTitle } from '@/styles';
import { IMAGES } from '@/assets';
import { env } from '@/config';

let name = 'name'
let Email = 'email'
let password = 'password'
let cpassword = 'confirmPassword'

type IProps = {
    getAccount: Function,
    editAccount: Function,
    navigation: Object,
    locale: String,
    handleSubmit: Function,
    isLoading: Boolean,
    editAccountLoading: Boolean
}
export class Account extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            avatar: null,
            avatarUrl: null,
            fileLoading: false,
        }
    }

    componentDidMount() {
        const { getAccount, navigation } = this.props
        getAccount({
            onResult: ({ user }) => {
                this.setState({ avatarUrl: user?.avatar ?? null })
            }
        })
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(EDIT_ACCOUNT, field, value));
    };

    onProfileUpdate = (value) => {
        const { navigation, editAccount, editAccountLoading } = this.props
        const { avatar, fileLoading } = this.state

        if (!fileLoading && !editAccountLoading) {
            editAccount({
                params: value,
                avatar,
                navigation
            })
        }
    }

    BOTTOM_ACTION = (handleSubmit) => {
        const { editAccountLoading, locale } = this.props
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onProfileUpdate)}
                    btnTitle={Lng.t("button.save", { locale })}
                    loading={editAccountLoading || this.state.fileLoading}
                />
            </View>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            isLoading,
        } = this.props;

        let accountRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: Lng.t("header.setting.account", { locale }),
                    titleStyle: headerTitle({ marginLeft: -20, marginRight: -25 }),
                    placement: "center",
                    rightIcon: "save",
                    rightIconProps: {
                        solid: true,
                    },
                    rightIconPress: handleSubmit(this.onProfileUpdate),
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: isLoading
                }}
            >

                <View style={styles.mainContainer}>

                    <Field
                        name={"avatar"}
                        component={FilePicker}
                        navigation={navigation}
                        onChangeCallback={(val) =>
                            this.setState({ avatar: val })
                        }
                        imageUrl={this.state.avatarUrl}
                        containerStyle={styles.avatarContainer}
                        fileLoading={(val) => {
                            this.setState({ fileLoading: val })
                        }}
                        hasAvatar
                        imageContainerStyle={styles.imageContainerStyle}
                        imageStyle={styles.imageStyle}
                        loadingContainerStyle={styles.loadingContainerStyle}
                        defaultImage={IMAGES.DEFAULT_AVATAR}
                    />

                    <Field
                        name={name}
                        component={InputField}
                        isRequired
                        hint={Lng.t("settings.account.name", { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            onSubmitEditing: () => {
                                accountRefs.email.focus();
                            }
                        }}
                    />

                    <Field
                        name={Email}
                        component={InputField}
                        isRequired
                        hint={Lng.t("settings.account.email", { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: 'email-address',
                            onSubmitEditing: () => {
                                accountRefs.password.focus();
                            }
                        }}
                        refLinkFn={(ref) => {
                            accountRefs.email = ref;
                        }}
                    />

                    <Field
                        name={password}
                        component={InputField}
                        hint={Lng.t("settings.account.password", { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            onSubmitEditing: () => {
                                accountRefs.confirm.focus();
                            }
                        }}
                        secureTextEntry
                        secureTextIconContainerStyle={styles.eyeIcon}
                        refLinkFn={(ref) => {
                            accountRefs.password = ref;
                        }}
                    />

                    <Field
                        name={cpassword}
                        component={InputField}
                        hint={Lng.t("settings.account.confirmPassword", { locale })}
                        inputProps={{
                            returnKeyType: 'go',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            onSubmitEditing: handleSubmit(this.onProfileUpdate)
                        }}
                        secureTextEntry
                        secureTextIconContainerStyle={styles.eyeIcon}
                        refLinkFn={(ref) => {
                            accountRefs.confirm = ref;
                        }}
                    />

                    <CtDivider
                        dividerStyle={styles.dividerLine}
                    />

                    <View style={styles.versionContainer}>
                        <Text style={styles.versionTitle}>
                            {Lng.t("settings.account.version", { locale })}
                            {'  '}
                            <Text style={styles.version}>
                                {env.APP_VERSION}
                            </Text>
                        </Text>
                    </View>

                </View>
            </DefaultLayout>
        );
    }
}
