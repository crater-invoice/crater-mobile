// @flow

import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { Field } from 'redux-form'
import styles from './styles'
import {
    InputField,
    AssetImage,
    CtGradientButton,
    CtHeader,
    CtButton
} from '../../../../components'
import { Text } from 'react-native-elements'
import { IMAGES } from '../../../../config'
import Lng from '../../../../api/lang/i18n'
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions'

type IProps = {
    navigation: Object,
    sendForgotPasswordMail: Function,
    handleSubmit: Function,
    loading: Boolean,
    socialLoading: Boolean,
    locale: String
}
export class ForgotPassword extends React.Component<IProps> {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            isMailSended: false
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSendMail = ({ email }) => {
        const { sendForgotPasswordMail, navigation } = this.props

        sendForgotPasswordMail({
            email,
            navigation,
            onResult: val => {
                if (val) {
                    this.setState({
                        email,
                        isMailSended: true
                    })
                }
            }
        })
    }

    resendMail = () => {
        const { email } = this.state
        this.onSendMail({ email })
    }

    render() {
        let passwordInput = {}

        const { handleSubmit, navigation, loading, locale } = this.props
        const { isMailSended, email } = this.state

        return (
            <View style={styles.container}>
                {!isMailSended ? (
                    <CtHeader
                        leftIcon="angle-left"
                        leftIconPress={() => navigation.goBack(null)}
                        title={Lng.t('header.back', { locale })}
                        titleOnPress={() => navigation.goBack(null)}
                        titleStyle={{
                            marginLeft: -10,
                            marginTop: Platform.OS === 'ios' ? -1 : 2
                        }}
                        placement="left"
                        noBorder
                        transparent
                    />
                ) : (
                    <CtHeader
                        placement="left"
                        transparent
                        rightIcon="times"
                        noBorder
                        rightIconPress={() => navigation.goBack(null)}
                    />
                )}

                <ScrollView
                    style={{ paddingTop: !isMailSended ? '23%' : '8%' }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flex: 1 }}
                        keyboardVerticalOffset={0}
                        behavior="height"
                    >
                        <View style={styles.main}>
                            <View style={styles.logoContainer}>
                                <AssetImage
                                    imageSource={IMAGES.LOGO_DARK}
                                    imageStyle={styles.imgLogo}
                                />
                            </View>

                            {!isMailSended ? (
                                <View>
                                    <Field
                                        name="email"
                                        component={InputField}
                                        inputProps={{
                                            returnKeyType: 'go',
                                            autoCapitalize: 'none',
                                            placeholder: Lng.t(
                                                'forgot.emailPlaceholder',
                                                { locale }
                                            ),
                                            autoCorrect: true,
                                            keyboardType: 'email-address',
                                            onSubmitEditing: handleSubmit(
                                                this.onSendMail
                                            )
                                        }}
                                        inputContainerStyle={styles.inputField}
                                    />
                                    <Text style={styles.forgotTextTitle}>
                                        {Lng.t('forgot.emailLabel', {
                                            locale
                                        })}
                                    </Text>
                                </View>
                            ) : (
                                <View style={styles.SendingMailContainer}>
                                    <AssetImage
                                        imageSource={IMAGES.OPEN_ENVELOP}
                                        imageStyle={styles.imgLogo}
                                    />
                                    <Text style={styles.emailSendDescription}>
                                        {Lng.t('forgot.emailSendDescription', {
                                            locale
                                        })}
                                    </Text>
                                </View>
                            )}
                            {!isMailSended ? (
                                <CtGradientButton
                                    onPress={handleSubmit(this.onSendMail)}
                                    btnTitle={Lng.t('button.recoveryEmail', {
                                        locale
                                    })}
                                    loading={loading}
                                    style={styles.buttonStyle}
                                    buttonContainerStyle={
                                        styles.buttonContainer
                                    }
                                />
                            ) : (
                                <CtGradientButton
                                    onPress={this.resendMail}
                                    btnTitle={Lng.t(
                                        'button.recoveryEmailAgain',
                                        { locale }
                                    )}
                                    loading={loading}
                                    style={styles.buttonStyle}
                                    buttonContainerStyle={
                                        styles.buttonContainer
                                    }
                                />
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}
