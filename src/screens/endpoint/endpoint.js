import React, {Component} from 'react';
import {KeyboardAvoidingView, StatusBar, ScrollView} from 'react-native';
import t from 'locales/use-translation';
import {styles, Container} from './endpoint-style';
import {Field} from 'redux-form';
import {isRTL, STATUS_BAR_CONTENT} from '@/utils';
import {IProps, IStates} from './endpoint-type.d';
import {saveEndpointURL} from 'stores/common/actions';
import {hasTextLength} from '@/constants';
import {defineLargeSizeParam} from '@/helpers/size';
import {keyboardType} from '@/helpers/keyboard';
import {
  BaseInput,
  AssetImage,
  CtHeader,
  BaseButton,
  View,
  Text
} from '@/components';

export default class Endpoint extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isLoading: false, showBackButton: false};
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.setState({showBackButton: navigation?.canGoBack?.()});
    });
  }

  componentWillUnmount() {
    this.focusListener?.remove?.();
  }

  onSubmit = async ({url: baseUrl}) => {
    if (!hasTextLength(baseUrl)) {
      return;
    }

    const {dispatch, navigation} = this.props;
    await this.setState({isLoading: true});
    const url = !(baseUrl.charAt(baseUrl.length - 1) === '/')
      ? baseUrl
      : baseUrl.slice(0, -1);
    dispatch(
      saveEndpointURL(url, navigation, () => this.setState({isLoading: false}))
    );
  };

  onBack = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const {handleSubmit, theme} = this.props;
    const {showBackButton} = this.state;

    const layoutStyle = showBackButton
      ? defineLargeSizeParam('25%', '15%')
      : defineLargeSizeParam('48%', '32%');

    return (
      <Container>
        {showBackButton ? (
          <CtHeader
            placement="left"
            noBorder
            transparent
            theme={theme}
            leftIcon={!isRTL() ? 'angle-left' : 'angle-right'}
            leftIconPress={this.onBack}
            title={t('header.back')}
            titleOnPress={this.onBack}
            titleStyle={styles.title}
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
          contentContainerStyle={{paddingTop: layoutStyle}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={
              showBackButton ? defineLargeSizeParam(90, 80) : 0
            }
            behavior="position"
          >
            <View class="flex-1 px-25 justify-center">
              <View style={styles.logoContainer}>
                <AssetImage
                  source={AssetImage.images[(theme?.mode)].logo}
                  style={styles.logo}
                />
              </View>
              <View>
                <Field
                  name="url"
                  component={BaseInput}
                  hint={t('endpoint.endpoint_url')}
                  onSubmitEditing={handleSubmit(this.onSubmit)}
                  placeholder={t('endpoint.url_placeholder')}
                  keyboardType={keyboardType.URL}
                />
                <Text h5 color={theme?.viewLabel?.fourthColor} class="mt-15">
                  {t('endpoint.endpoint_desc')}
                </Text>
              </View>

              <BaseButton
                type="primary-gradient"
                loading={this.state.isLoading}
                onPress={handleSubmit(this.onSubmit)}
                base-class="mt-55 mx-3"
                size="lg"
              >
                {t('button.save')}
              </BaseButton>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
