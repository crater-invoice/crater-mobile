// @flow

import React from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { Field } from 'redux-form';
import styles from './styles';
import { InputField, AssetImage, CtGradientButton } from '@/components';
import Constants from 'expo-constants';
import { colors } from '@/styles/colors';
import { ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import { IMAGES } from '@/assets';
import { isIosPlatform, isIPhoneX } from '@/constants';

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
        this.state = {
            isKeyboardVisible: false
        };
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => this.setState({ isKeyboardVisible: true })
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => this.setState({ isKeyboardVisible: false })
        );
    };

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    };

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
        const { isKeyboardVisible } = this.state;

        let loginRefs = {};
        let scrollViewStyle = {
            paddingTop:
                isKeyboardVisible && !isIPhoneX()
                    ? isIosPlatform()
                        ? '18%'
                        : '10%'
                    : isIPhoneX()
                    ? '50%'
                    : '34%'
        };

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    translucent={true}
                />

                <ScrollView
                    style={scrollViewStyle}
                    bounces={isKeyboardVisible}
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
                                    minCharacter={8}
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
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}
