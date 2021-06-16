// @flow

import React from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { Field } from 'redux-form';
import styles from './styles';
import {
    InputField,
    AssetImage,
    CtGradientButton,
    Text,
    AssetSvg
} from '@/components';
import Constants from 'expo-constants';
import { colors } from '@/styles/colors';
import { ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import { IMAGES } from '@/assets';
import { SettingIcon } from '@/icons';
import { biometricAuthentication } from '@/utils';
import {
    BIOMETRY_AUTH_TYPES,
    hasValue,
    isIosPlatform,
    isIPhoneX
} from '@/constants';

type IProps = {
    navigation: Object,
    login: Function,
    handleSubmit: Function,
    loading: Boolean,
    socialLoading: Boolean,
    locale: String,
    biometryAuthType: string,
    biometryAuthLogin: Function
};

export class Login extends React.Component<IProps> {
    keyboardDidShowListener: any;
    keyboardDidHideListener: any;

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

    loginViaBiometry = async () => {
        const { locale, biometryAuthLogin, navigation } = this.props;

        try {
            biometricAuthentication({
                locale,
                onSuccess: () => biometryAuthLogin({ navigation })
            });
        } catch (e) {}
    };

    render() {
        const { loading, navigation, locale, biometryAuthType } = this.props;
        const { isKeyboardVisible } = this.state;

        const BIOMETRY_TYPES_TITLES = {
            [BIOMETRY_AUTH_TYPES.FINGERPRINT]: Lng.t('touchFaceId.touchId', {
                locale
            }),
            [BIOMETRY_AUTH_TYPES.FACE]: Lng.t('touchFaceId.faceId', {
                locale
            })
        };

        let loginRefs: any = {};
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

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(ROUTES.ENDPOINTS, {
                            skipEndpoint: true
                        })
                    }
                    style={styles.setting}
                    hitSlop={{
                        top: 15,
                        left: 15,
                        bottom: 15,
                        right: 15
                    }}
                >
                    <AssetSvg
                        name={SettingIcon}
                        width={35}
                        height={35}
                        fill={colors.primary}
                    />
                </TouchableOpacity>

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
                                    <Text
                                        primaryLight
                                        light
                                        style={styles.forgetPassword}
                                    >
                                        {Lng.t('button.forget', {
                                            locale
                                        })}
                                    </Text>
                                </TouchableOpacity>
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
                                    isLoading={loading}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                {hasValue(biometryAuthType) && (
                    <TouchableOpacity
                        onPress={this.loginViaBiometry}
                        style={styles.biometryButton}
                    >
                        <Text primary style={styles.biometryText}>
                            {Lng.t('touchFaceId.login', {
                                locale,
                                type: BIOMETRY_TYPES_TITLES[biometryAuthType]
                            })}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}
