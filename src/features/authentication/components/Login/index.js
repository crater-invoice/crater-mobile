import React from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {Field, reset} from 'redux-form';
import {styles, Container} from './styles';
import {
  InputField,
  AssetImage,
  CtGradientButton,
  Text,
  AssetSvg
} from '@/components';
import Constants from 'expo-constants';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {LOGO} from '@/assets';
import {SettingIcon} from '@/icons';
import {biometricAuthentication, STATUS_BAR_CONTENT} from '@/utils';
import {INVOICE_SEARCH as INVOICES_FORM} from '@/features/invoices/constants';
import {
  BIOMETRY_AUTH_TYPES,
  hasValue,
  isIosPlatform,
  isIPhoneX,
  keyboardReturnKeyType,
  keyboardType
} from '@/constants';

type IProps = {
  navigation: Object,
  login: Function,
  handleSubmit: Function,
  loading: Boolean,
  socialLoading: Boolean,
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
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({isKeyboardVisible: true})
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({isKeyboardVisible: false})
    );
    this.props.dispatch?.(reset?.(INVOICES_FORM));
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  onLogin = values => {
    const {navigation, login} = this.props;
    login({
      params: {...values, device_name: Constants.deviceName},
      navigation
    });
  };

  loginViaBiometry = async () => {
    const {biometryAuthLogin, navigation} = this.props;

    try {
      biometricAuthentication({
        onSuccess: () => biometryAuthLogin({navigation})
      });
    } catch (e) {}
  };

  render() {
    const {loading, navigation, biometryAuthType, theme} = this.props;
    const {isKeyboardVisible} = this.state;

    const BIOMETRY_TYPES_TITLES = {
      [BIOMETRY_AUTH_TYPES.FINGERPRINT]: t('touchFaceId.touchId'),
      [BIOMETRY_AUTH_TYPES.FACE]: t('touchFaceId.faceId')
    };

    let loginRefs: any = {};
    let scrollViewStyle = {
      paddingTop:
        isKeyboardVisible && !isIPhoneX()
          ? isIosPlatform
            ? '18%'
            : '10%'
          : isIPhoneX()
          ? '50%'
          : '34%'
    };

    return (
      <Container>
        <StatusBar
          barStyle={STATUS_BAR_CONTENT[(theme?.mode)]}
          hidden={false}
          translucent={true}
          backgroundColor={theme?.backgroundColor}
        />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.ENDPOINTS, {
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
            fill={theme?.icons?.primaryBgColor}
          />
        </TouchableOpacity>

        <ScrollView
          style={scrollViewStyle}
          bounces={isKeyboardVisible}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            style={{flex: 1}}
            contentContainerStyle={{flex: 1}}
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

              <Field
                name="username"
                component={InputField}
                onSubmitEditing={() => loginRefs.password.focus()}
                placeholder={t('login.email')}
                keyboardType={keyboardType.EMAIL}
                inputContainerStyle={styles.inputField}
              />

              <Field
                name="password"
                component={InputField}
                returnKeyType={keyboardReturnKeyType.GO}
                onSubmitEditing={this.props.handleSubmit(this.onLogin)}
                placeholder={t('login.password')}
                inputContainerStyle={styles.inputField}
                secureTextEntry
                refLinkFn={ref => {
                  loginRefs.password = ref;
                }}
                minCharacter={8}
              />

              <View style={styles.forgetPasswordContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)}
                >
                  <Text
                    light
                    color={theme?.text?.fourthColor}
                    style={styles.forgetPassword}
                  >
                    {t('button.forget')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 25}}>
                <CtGradientButton
                  onPress={this.props.handleSubmit(this.onLogin)}
                  btnTitle={t('button.singIn')}
                  loading={loading}
                  isLoading={loading}
                  style={{paddingVertical: 8}}
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
            <Text
              primary
              style={styles.biometryText}
              color={theme?.text?.primaryColor}
            >
              {t('touchFaceId.login', {
                type: BIOMETRY_TYPES_TITLES[biometryAuthType]
              })}
            </Text>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}
