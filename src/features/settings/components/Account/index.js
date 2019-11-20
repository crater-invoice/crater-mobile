// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { DefaultLayout, CtButton, InputField, CtDivider } from '../../../../components';
import { Field, change } from 'redux-form';
import Lng from '../../../../api/lang/i18n';
import { EDIT_ACCOUNT } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { headerTitle } from '../../../../api/helper';
import { env } from '../../../../config';


let name = 'name'
let Email = 'email'
let password = 'password'
let cpassword = 'confirmPassword'

type IProps = {
    getAccount: Function,
    editAccount: Function,
    navigation: Object,
    language: String,
    handleSubmit: Function,
    isLoading: Boolean,
    editAccountLoading: Boolean
}
export class Account extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        const { getAccount, navigation } = this.props
        getAccount()
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(EDIT_ACCOUNT, field, value));
    };

    onProfileUpdate = (value) => {
        const { navigation, editAccount } = this.props
        editAccount({ params: value, navigation })
    }

    BOTTOM_ACTION = (handleSubmit) => {
        const { editAccountLoading, language } = this.props
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onProfileUpdate)}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    loading={editAccountLoading}
                />
            </View>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            language,
            isLoading,
        } = this.props;

        let accountRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: Lng.t("header.setting.account", { locale: language }),
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
                        name={name}
                        component={InputField}
                        isRequired
                        hint={Lng.t("settings.account.name", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            autoFocus: true,
                            onSubmitEditing: () => {
                                accountRefs.email.focus();
                            }
                        }}
                    />

                    <Field
                        name={Email}
                        component={InputField}
                        isRequired
                        hint={Lng.t("settings.account.email", { locale: language })}
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
                        hint={Lng.t("settings.account.password", { locale: language })}
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
                        hint={Lng.t("settings.account.confirmPassword", { locale: language })}
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
                            {Lng.t("settings.account.version", { locale: language })}
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
