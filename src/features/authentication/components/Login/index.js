// @flow

import React, { Component } from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity
} from 'react-native';
import { Field } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtButton,
    AssetImage,
    CtDivider,
    CtGradientButton
} from '../../../../components';
// import * as Google from 'expo-google-app-auth';
import Constants from 'expo-constants';
import { env, IMAGES } from '@/config';
import { colors } from '@/styles/colors';
import { ROUTES } from '@/navigation/routes';
import Lng from '@/api/lang/i18n';

type IProps = {
    navigation: Object,
    login: Function,
    handleSubmit: Function,
    loading: Boolean,
    socialLoading: Boolean,
    locale: String
};
export class Login extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }

    /*
     * Sign in with google
     onSocialLogin = async () => {
         const { navigation, socialLogin } = this.props;
         socialLogin({});
         try {
             const result = await Google.logInAsync({
                 androidClientId: env.GOOGLE_ANDROID_CLIENT_ID,
                 iosClientId: env.GOOGLE_IOS_CLIENT_ID,
                 scopes: ['profile', 'email'],
             });

             if (result.type === 'success') {
                 socialLogin({
                     idToken: result.idToken,
                     navigation,
                 });
             } else {
             }
         } catch (e) {
             // console.log(e);
         }
     }; */

    onLogin = values => {
        const { navigation, login } = this.props;
        login({
            params: { ...values, device_name: Constants.deviceName },
            navigation
        });
    };

    render() {
        let passwordInput = {};
        const { loading, socialLoading, navigation, locale } = this.props;

        let loginRefs = {};

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    translucent={true}
                />

                <ScrollView
                    style={{ paddingTop: '34%' }}
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

                            <View style={styles.loginContainer}>
                                <Field
                                    name="username"
                                    component={InputField}
                                    inputProps={{
                                        returnKeyType: 'next',
                                        autoCapitalize: 'none',
                                        placeholder: Lng.t('login.email', {
                                            locale
                                        }),
                                        autoCorrect: true,
                                        keyboardType: 'email-address',
                                        onSubmitEditing: () => {
                                            loginRefs.password.focus();
                                        }
                                    }}
                                    placeholderColor={colors.white5}
                                    inputContainerStyle={styles.inputField}
                                />
                                <Field
                                    refLinkFn={ref => {
                                        passwordInput = ref;
                                    }}
                                    name="password"
                                    component={InputField}
                                    inputProps={{
                                        returnKeyType: 'go',
                                        autoCapitalize: 'none',
                                        placeholder: Lng.t('login.password', {
                                            locale
                                        }),
                                        autoCorrect: true,
                                        onSubmitEditing: this.props.handleSubmit(
                                            this.onLogin
                                        )
                                    }}
                                    inputContainerStyle={styles.inputField}
                                    secureTextEntry
                                    refLinkFn={ref => {
                                        loginRefs.password = ref;
                                    }}
                                />

                                <View style={styles.forgetPasswordContainer}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                ROUTES.FORGOT_PASSWORD
                                            )
                                        }
                                    >
                                        <Text style={styles.forgetPassword}>
                                            {Lng.t('button.forget', {
                                                locale
                                            })}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginTop: 25 }}>
                                <CtGradientButton
                                    onPress={this.props.handleSubmit(
                                        this.onLogin
                                    )}
                                    btnTitle={Lng.t('button.singIn', {
                                        locale
                                    })}
                                    loading={loading}
                                />
                            </View>

                            {/*
                            * Sign in with google


                            <CtDivider title="or" />

                            <View style={styles.socialLoginContainer}>
                                <CtButton
                                    raised
                                    imageSource={IMAGES.GOOGLE_ICON}
                                    imageIcon
                                    onPress={() => this.onSocialLogin()}
                                    btnTitle={Lng.t("button.singInGoogle", { locale })}
                                    loading={socialLoading}
                                    buttonType={BUTTON_COLOR.WHITE}
                                    color={colors.dark3}
                                />
                            </View>
                        */}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}
