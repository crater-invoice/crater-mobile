import React from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import {Field} from 'redux-form';
import {styles, Container} from './login-style';
import {routes} from '@/navigation';
import {IProps, IStates} from './login-type.d';
import t from 'locales/use-translation';
import {biometricAuthentication, STATUS_BAR_CONTENT} from '@/utils';
import {BaseInput, AssetImage, Text, AssetSvg, BaseButton} from '@/components';
import {login, biometryAuthLogin} from 'stores/auth/actions';
import {keyboardType, keyboardReturnKeyType} from '@/helpers/keyboard';
import {defineLargeSizeParam} from '@/helpers/size';
import {
  BIOMETRY_AUTH_TYPES,
  hasObjectLength,
  hasValue,
  hitSlop
} from '@/constants';

export default class Login extends React.Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isLoading: false};
  }

  onSubmit = async values => {
    if (!hasObjectLength(values)) {
      return;
    }
    await this.setState({isLoading: true});
    const params = {
      ...values,
      device_name: values.username
    };
    this.props.dispatch(login(params, () => this.setState({isLoading: false})));
  };

  loginViaBiometry = async () => {
    try {
      biometricAuthentication({
        onSuccess: async () => {
          await this.setState({isLoading: true});
          this.props.dispatch(
            biometryAuthLogin(() => this.setState({isLoading: false}))
          );
        }
      });
    } catch (e) {}
  };

  render() {
    const loginRefs: any = {};
    const {navigation, biometryAuthType, theme} = this.props;
    const BIOMETRY_TYPES_TITLES = {
      [BIOMETRY_AUTH_TYPES.FINGERPRINT]: t('touch_face_id.touch_id'),
      [BIOMETRY_AUTH_TYPES.FACE]: t('touch_face_id.face_id')
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
          onPress={() => navigation.navigate(routes.ENDPOINTS)}
          style={styles.setting}
          hitSlop={hitSlop(20, 20, 20, 20)}
        >
          <AssetSvg
            name={AssetSvg.icons.setting}
            width={35}
            height={35}
            fill={theme?.icons?.primaryBgColor}
          />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={{
            paddingTop: defineLargeSizeParam('55%', '38%')
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="position">
            <View style={styles.main}>
              <View style={styles.logoContainer}>
                <AssetImage
                  source={AssetImage.images[(theme?.mode)].logo}
                  style={styles.logo}
                />
              </View>

              <Field
                name="username"
                component={BaseInput}
                onSubmitEditing={() => loginRefs.password.focus()}
                placeholder={t('login.email')}
                keyboardType={keyboardType.EMAIL}
                inputContainerStyle={styles.inputField}
              />

              <Field
                name="password"
                component={BaseInput}
                returnKeyType={keyboardReturnKeyType.GO}
                onSubmitEditing={this.props.handleSubmit(this.onSubmit)}
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

              <BaseButton
                base-class="mx-5"
                class={`mt-${defineLargeSizeParam(40, 25)}`}
                type="primary-gradient"
                size="lg"
                onPress={this.props.handleSubmit(this.onSubmit)}
                loading={this.state.isLoading}
              >
                {t('button.sing_in')}
              </BaseButton>
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
              {t('touch_face_id.login', {
                type: BIOMETRY_TYPES_TITLES[biometryAuthType]
              })}
            </Text>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}
