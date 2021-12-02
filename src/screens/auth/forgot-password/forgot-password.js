import React from 'react';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Field} from 'redux-form';
import {styles, Container} from './forgot-password-style';
import {IProps, IStates} from './forgot-password-type.d';
import t from 'locales/use-translation';
import {hasTextLength} from '@/constants';
import {keyboardType, keyboardReturnKeyType} from '@/helpers/keyboard';
import {sendForgotPasswordMail} from 'stores/auth/actions';
import {BaseInput, AssetImage, CtHeader, Text, BaseButton} from '@/components';
import {defineLargeSizeParam} from '@/helpers/size';

export default class ForgotPassword extends React.Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isMailSended: false,
      isLoading: false
    };
  }

  onSendMail = async ({email}) => {
    if (!hasTextLength(email)) {
      return;
    }

    await this.setState({isLoading: true});

    this.props.dispatch(
      sendForgotPasswordMail({
        email,
        onSuccess: () =>
          this.setState({email, isMailSended: true, isLoading: false}),
        onFail: () => this.setState({isLoading: false})
      })
    );
  };

  resendMail = () => this.onSendMail({email: this.state.email});

  render() {
    const {handleSubmit, navigation, theme} = this.props;
    const {isMailSended} = this.state;

    return (
      <Container>
        {!isMailSended ? (
          <CtHeader
            leftIcon="angle-left"
            leftIconPress={() => navigation.goBack(null)}
            title={t('header.back')}
            titleOnPress={() => navigation.goBack(null)}
            titleStyle={styles.headerTitle}
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
            rightIconProps={{
              size: defineLargeSizeParam(24, 22),
              style: styles.close
            }}
            theme={theme}
          />
        )}
        <ScrollView
          contentContainerStyle={{
            paddingTop: isMailSended
              ? defineLargeSizeParam('28%', '15%')
              : defineLargeSizeParam('27%', '20%')
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="position">
            <View style={styles.main}>
              <View style={styles.logoContainer}>
                <AssetImage
                  source={AssetImage.images[(theme?.mode)].logo}
                  style={styles.logo}
                />
              </View>

              {!isMailSended ? (
                <>
                  <Field
                    name="email"
                    component={BaseInput}
                    returnKeyType={keyboardReturnKeyType.GO}
                    onSubmitEditing={handleSubmit(this.onSendMail)}
                    placeholder={t('forgot.email_placeholder')}
                    keyboardType={keyboardType.EMAIL}
                    inputContainerStyle={styles.inputField}
                  />
                  <Text
                    h5
                    color={theme?.viewLabel?.fourthColor}
                    style={styles.forgotTextTitle}
                  >
                    {t('forgot.email_label')}
                  </Text>
                  <BaseButton
                    type="primary-gradient"
                    loading={this.state.isLoading}
                    onPress={handleSubmit(this.onSendMail)}
                    base-class="mt-55 mx-3"
                    size="lg"
                  >
                    {t('button.recovery_email')}
                  </BaseButton>
                </>
              ) : (
                <>
                  <View style={styles.SendingMailContainer}>
                    <AssetImage
                      source={AssetImage.images.envelop}
                      style={styles.envelop}
                    />
                    <Text
                      h5
                      color={theme?.viewLabel?.fourthColor}
                      style={styles.emailSendDescription}
                    >
                      {t('forgot.email_send_description')}
                    </Text>
                  </View>
                  <BaseButton
                    type="primary-gradient"
                    loading={this.state.isLoading}
                    onPress={this.resendMail}
                    base-class="mt-55 mx-5"
                    size="lg"
                  >
                    {t('button.recovery_email_again')}
                  </BaseButton>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
