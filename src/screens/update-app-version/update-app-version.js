import React, {Component} from 'react';
import {View, BackHandler} from 'react-native';
import * as Linking from 'expo-linking';
import {styles, Container} from './update-app-version-styles';
import {Text, AssetImage, BaseButton} from '@/components';
import t from 'locales/use-translation';
import {isAndroidPlatform} from '@/helpers/platform';
import {ITheme} from '@/interfaces';

export default class UpdateAppVersion extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    return true;
  }

  onUpdateApp = async () => {
    await this.setState({loading: true});

    const url = {
      ios: 'http://itunes.apple.com/app/id1489169767',
      android: 'https://play.google.com/store/apps/details?id=com.craterapp.app'
    };

    isAndroidPlatform ? Linking.openURL(url.android) : Linking.openURL(url.ios);

    setTimeout(() => {
      this.setState({loading: false});
    }, 1000);
  };

  render() {
    const {theme} = this.props;

    return (
      <Container>
        <View style={styles.main}>
          <View style={styles.logoContainer}>
            <AssetImage
              source={AssetImage.images[(theme?.mode)].logo}
              style={styles.imgLogo}
            />
          </View>

          <View style={styles.bodyContainer}>
            <Text
              h5
              style={styles.title}
              bold2={theme?.mode === 'dark'}
              color={theme?.text?.primaryColor}
            >
              {t('update_app.title')}
            </Text>

            <Text
              h6
              center
              style={styles.description}
              medium={theme?.mode === 'dark'}
              color={theme?.text?.fourthColor}
            >
              {t('update_app.description')}
            </Text>
          </View>

          <BaseButton
            type="primary-gradient"
            base-class="mt-30 mx-5"
            onPress={this.onUpdateApp}
            loading={this.state.loading}
          >
            {t('button.update_capital')}
          </BaseButton>
        </View>
      </Container>
    );
  }
}

interface IProps {
  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

interface IStates {
  /**
   * The loading indicator for the button.
   */
  loading?: Boolean;
}
