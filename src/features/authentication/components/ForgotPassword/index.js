// @flow

import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard
} from 'react-native';
import { Field } from 'redux-form';
import { styles, Container } from './styles';
import {
    InputField,
    AssetImage,
    CtGradientButton,
    CtHeader,
    Text
} from '@/components';
import { IMAGES, LOGO } from '@/assets';
import Lng from '@/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { isIPhoneX } from '@/constants';

type IProps = {
    navigation: Object,
    sendForgotPasswordMail: Function,
    handleSubmit: Function,
    loading: Boolean,
    socialLoading: Boolean,
    locale: String
};
export class ForgotPassword extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isMailSended: false,
            isKeyboardVisible: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => this.setState({ isKeyboardVisible: true })
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => this.setState({ isKeyboardVisible: false })
        );
    }

    componentWillUnmount() {
        goBack(UNMOUNT);

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onSendMail = ({ email }) => {
        const { sendForgotPasswordMail, navigation } = this.props;

        sendForgotPasswordMail({
            email,
            navigation,
            onResult: val => {
                if (val) {
                    this.setState({
                        email,
                        isMailSended: true
                    });
                }
            }
        });
    };

    resendMail = () => {
        const { email } = this.state;
        this.onSendMail({ email });
    };

    render() {
        let passwordInput = {};

        const { handleSubmit, navigation, loading, locale, theme } = this.props;
        const { isMailSended, email, isKeyboardVisible } = this.state;

        return (
            <Container>
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
                        theme={theme}
                    />
                ) : (
                    <CtHeader
                        placement="left"
                        transparent
                        rightIcon="times"
                        noBorder
                        rightIconPress={() => navigation.goBack(null)}
                        theme={theme}
                    />
                )}

                <ScrollView
                    style={{
                        paddingTop:
                            isKeyboardVisible && !isIPhoneX()
                                ? '5%'
                                : !isMailSended
                                ? '23%'
                                : '8%'
                    }}
                    bounces={true}
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
                                    imageSource={LOGO[(theme?.mode)]}
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
                                    <Text
                                        h5
                                        color={theme?.viewLabel?.fourthColor}
                                        style={styles.forgotTextTitle}
                                    >
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
                                    <Text
                                        h5
                                        color={theme?.viewLabel?.fourthColor}
                                        style={styles.emailSendDescription}
                                    >
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
            </Container>
        );
    }
}
