import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard
} from 'react-native';
import {Field} from 'redux-form';
import {styles, Container} from './styles';
import {
  InputField,
  AssetImage,
  CtGradientButton,
  CtHeader,
  Text
} from '@/components';
import t from 'locales/use-translation';
import {isIPhoneX, keyboardReturnKeyType, keyboardType} from '@/constants';

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
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({isKeyboardVisible: true})
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({isKeyboardVisible: false})
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onSendMail = ({email}) => {
    const {sendForgotPasswordMail, navigation} = this.props;

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
    const {email} = this.state;
    this.onSendMail({email});
  };

  render() {
    const {handleSubmit, navigation, loading, theme} = this.props;
    const {isMailSended, isKeyboardVisible} = this.state;

    return (
      <Container>
        {!isMailSended ? (
          <CtHeader
            leftIcon="angle-left"
            leftIconPress={() => navigation.goBack(null)}
            title={t('header.back')}
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
            style={{flex: 1}}
            contentContainerStyle={{flex: 1}}
            keyboardVerticalOffset={0}
            behavior="height"
          >
            <View style={styles.main}>
              <View style={styles.logoContainer}>
                <AssetImage
                  imageSource={AssetImage.images[(theme?.mode)].logo}
                  imageStyle={styles.imgLogo}
                />
              </View>

              {!isMailSended ? (
                <View>
                  <Field
                    name="email"
                    component={InputField}
                    returnKeyType={keyboardReturnKeyType.GO}
                    onSubmitEditing={handleSubmit(this.onSendMail)}
                    placeholder={t('forgot.emailPlaceholder')}
                    keyboardType={keyboardType.EMAIL}
                    inputContainerStyle={styles.inputField}
                  />
                  <Text
                    h5
                    color={theme?.viewLabel?.fourthColor}
                    style={styles.forgotTextTitle}
                  >
                    {t('forgot.emailLabel')}
                  </Text>
                </View>
              ) : (
                <View style={styles.SendingMailContainer}>
                  <AssetImage
                    imageSource={AssetImage.images.envelop}
                    imageStyle={styles.imgLogo}
                  />
                  <Text
                    h5
                    color={theme?.viewLabel?.fourthColor}
                    style={styles.emailSendDescription}
                  >
                    {t('forgot.emailSendDescription')}
                  </Text>
                </View>
              )}
              {!isMailSended ? (
                <CtGradientButton
                  onPress={handleSubmit(this.onSendMail)}
                  btnTitle={t('button.recoveryEmail')}
                  loading={loading}
                  style={styles.buttonStyle}
                  buttonContainerStyle={styles.buttonContainer}
                />
              ) : (
                <CtGradientButton
                  onPress={this.resendMail}
                  btnTitle={t('button.recoveryEmailAgain')}
                  loading={loading}
                  style={styles.buttonStyle}
                  buttonContainerStyle={styles.buttonContainer}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
