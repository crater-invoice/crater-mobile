import React, {Component} from 'react';
import {KeyboardAvoidingView, StatusBar, ScrollView} from 'react-native';
import t from 'locales/use-translation';
import {styles, Container} from './endpoint-style';
import {Field} from 'redux-form';
import {isRTL, STATUS_BAR_CONTENT} from '@/utils';
import {IProps, IStates} from './endpoint-type';
import {saveEndpointURL} from 'stores/common/actions';
import {hasTextLength, keyboardType} from '@/constants';
import {
  InputField,
  AssetImage,
  CtGradientButton,
  CtHeader,
  View,
  Text
} from '@/components';

export default class Endpoint extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isLoading: false};
  }

  onSubmit = async ({url: baseUrl}) => {
    const {dispatch, navigation} = this.props;

    if (!hasTextLength(baseUrl)) {
      return;
    }

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
    const {handleSubmit, showBackButton = false, theme} = this.props;

    return (
      <Container>
        {showBackButton ? (
          <CtHeader
            leftIcon={!isRTL() ? 'angle-left' : 'angle-right'}
            leftIconPress={this.onBack}
            title={t('header.back')}
            titleOnPress={this.onBack}
            titleStyle={styles.title}
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
          contentContainerStyle={{paddingTop: showBackButton ? '15%' : '32%'}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={showBackButton ? 80 : 0}
            behavior="position"
          >
            <View class="flex-1 px-25 justify-center">
              <View style={styles.logoContainer}>
                <AssetImage
                  imageSource={AssetImage.images[(theme?.mode)].logo}
                  imageStyle={styles.logo}
                />
              </View>
              <View>
                <Field
                  name="url"
                  component={InputField}
                  hint={t('endpoint.endpointURL')}
                  onSubmitEditing={handleSubmit(this.onSubmit)}
                  placeholder={t('endpoint.urlPlaceHolder')}
                  keyboardType={keyboardType.URL}
                />
                <Text h5 color={theme?.viewLabel?.fourthColor} class="mt-15">
                  {t('endpoint.endpointDesc')}
                </Text>
              </View>

              <CtGradientButton
                onPress={handleSubmit(this.onSubmit)}
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
