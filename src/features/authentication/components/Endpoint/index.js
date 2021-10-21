import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  Platform,
  Keyboard
} from 'react-native';
import {styles, Container} from './styles';
import {Field} from 'redux-form';
import {
  InputField,
  AssetImage,
  CtGradientButton,
  CtHeader,
  Text
} from '@/components';
import t from 'locales/use-translation';
import {
  hasTextLength,
  isIosPlatform,
  isIPhoneX,
  keyboardType
} from '@/constants';
import {isRTL, STATUS_BAR_CONTENT} from '@/utils';

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
      isKeyboardVisible: false,
      isLoading: false
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

  onSetEndpointApi = async ({endpointURL}) => {
    if (!hasTextLength(endpointURL)) {
      return;
    }

    await this.setState({isLoading: true});

    const {checkEndpointApi, navigation} = this.props;
    const URL = endpointURL;

    checkEndpointApi({
      endpointURL: !(URL.charAt(URL.length - 1) === '/')
        ? URL
        : URL.slice(0, -1),
      navigation,
      onResult: () => this.setState({isLoading: false})
    });
  };

  onBack = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const {handleSubmit, skipEndpoint = false, theme} = this.props;

    const {isKeyboardVisible} = this.state;
    const isIPhone = isIPhoneX();
    let scrollViewStyle = {
      paddingTop:
        isKeyboardVisible && !isIPhone
          ? skipEndpoint
            ? '-10%'
            : isIosPlatform
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
            title={t('header.back')}
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
              <View>
                <Field
                  name="endpointURL"
                  component={InputField}
                  hint={t('endpoint.endpointURL')}
                  onSubmitEditing={handleSubmit(this.onSetEndpointApi)}
                  placeholder={t('endpoint.urlPlaceHolder')}
                  keyboardType={keyboardType.URL}
                  inputContainerStyle={styles.inputField}
                />
                <Text
                  h5
                  color={theme?.viewLabel?.fourthColor}
                  style={styles.endpointTextTitle}
                >
                  {t('endpoint.endpointDesc')}
                </Text>
              </View>

              <CtGradientButton
                onPress={handleSubmit(this.onSetEndpointApi)}
                btnTitle={t('button.save')}
                loading={this.state.isLoading}
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
