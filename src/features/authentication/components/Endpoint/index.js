// @flow

import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Platform,
    Keyboard
} from 'react-native';
import { styles, Container } from './styles';
import { Field } from 'redux-form';
import {
    InputField,
    AssetImage,
    CtGradientButton,
    CtHeader,
    Text
} from '@/components';
import Lng from '@/lang/i18n';
import { IMAGES, LOGO } from '@/assets';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { alertMe, isIosPlatform, isIPhoneX } from '@/constants';
import { isRTL, STATUS_BAR_CONTENT } from '@/utils';

type IProps = {
    label: String,
    icon: String,
    placeholder: String,
    containerStyle: Object,
    leftIcon: String,
    color: String,
    value: String,
    items: Object,
    rightIcon: String,
    loading: Boolean,
    checkEndpointApi: Function,
    navigation: any,
    skipEndpoint: boolean,
    locale: string
};

export class Endpoint extends Component<IProps> {
    keyboardDidShowListener: any;
    keyboardDidHideListener: any;
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            isKeyboardVisible: false
        };
    }

    componentDidMount() {
        const { navigation, skipEndpoint } = this.props;

        skipEndpoint &&
            goBack(MOUNT, navigation, { route: ROUTES.SETTING_LIST });

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
        const { skipEndpoint } = this.props;
        skipEndpoint && goBack(UNMOUNT);

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onSetEndpointApi = ({ endpointURL }) => {
        this.setState({ isFocus: false });

        const { checkEndpointApi, navigation, locale } = this.props;
        let URL = endpointURL;

        checkEndpointApi({
            endpointURL: !(URL.charAt(URL.length - 1) === '/')
                ? URL
                : URL.slice(0, -1),
            onResult: val => {
                !val
                    ? alertMe({
                          title: Lng.t('endpoint.alertInvalidUrl', { locale })
                      })
                    : navigation.navigate(ROUTES.LOGIN);
            }
        });
    };

    onBack = () => {
        this.props.navigation.navigate(ROUTES.SETTING_LIST);
    };

    toggleFocus = () => {
        this.setState(prevState => {
            return { isFocus: !prevState.isFocus };
        });
    };

    render() {
        const {
            handleSubmit,
            locale,
            skipEndpoint = false,
            loading,
            theme
        } = this.props;

        const { isKeyboardVisible } = this.state;
        const isIPhone = isIPhoneX();
        let scrollViewStyle = {
            paddingTop:
                isKeyboardVisible && !isIPhone
                    ? skipEndpoint
                        ? '-10%'
                        : isIosPlatform()
                        ? '17%'
                        : '12%'
                    : skipEndpoint
                    ? isIPhone
                        ? '20%'
                        : '15%'
                    : isIPhone
                    ? '43%'
                    : '32%'
        };

        return (
            <Container>
                {skipEndpoint ? (
                    <CtHeader
                        leftIcon={!isRTL() ? 'angle-left' : 'angle-right'}
                        leftIconPress={() => this.onBack()}
                        title={Lng.t('header.back', { locale })}
                        titleOnPress={() => this.onBack()}
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
                    <StatusBar
                        barStyle={STATUS_BAR_CONTENT[(theme?.mode)]}
                        hidden={false}
                        translucent={true}
                        backgroundColor={theme?.backgroundColor}
                    />
                )}

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
                                    imageSource={LOGO[(theme?.mode)]}
                                    imageStyle={styles.imgLogo}
                                />
                            </View>
                            <View>
                                <Field
                                    name="endpointURL"
                                    component={InputField}
                                    hint={Lng.t('endpoint.endpointURL', {
                                        locale
                                    })}
                                    inputProps={{
                                        autoCapitalize: 'none',
                                        placeholder: Lng.t(
                                            'endpoint.urlPlaceHolder',
                                            { locale }
                                        ),
                                        autoCorrect: true,
                                        keyboardType: 'url',
                                        onSubmitEditing: handleSubmit(
                                            this.onSetEndpointApi
                                        )
                                    }}
                                    onFocus={() => this.toggleFocus()}
                                    inputContainerStyle={styles.inputField}
                                />
                                <Text
                                    h5
                                    color={theme?.viewLabel?.fourthColor}
                                    style={styles.endpointTextTitle}
                                >
                                    {Lng.t('endpoint.endpointDesc', { locale })}
                                </Text>
                            </View>

                            <CtGradientButton
                                onPress={handleSubmit(this.onSetEndpointApi)}
                                btnTitle={Lng.t('button.save', { locale })}
                                loading={this.state.isFocus ? false : loading}
                                style={styles.buttonStyle}
                                buttonContainerStyle={styles.buttonContainer}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </Container>
        );
    }
}
