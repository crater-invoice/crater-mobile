import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import * as Linking from 'expo-linking';
import {connect} from 'react-redux';
import {styles, Container} from './styles';
import {AssetImage} from '../AssetImage';
import {CtGradientButton} from '../Button';
import {Text} from '../Text';
import t from 'locales/use-translation';
import {commonSelector} from 'stores/common/selectors';

export class UpdateAppVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onUpdateApp = () => {
    this.setState({loading: true});

    setTimeout(() => {
      this.setState({loading: false});
    }, 1000);

    Platform.OS === 'android'
      ? Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.craterapp.app'
        )
      : Linking.openURL('http://itunes.apple.com/app/id1489169767');
  };

  render() {
    const {theme} = this.props;
    const {loading} = this.state;

    return (
      <Container>
        <View style={styles.main}>
          <View style={styles.logoContainer}>
            <AssetImage
              imageSource={AssetImage.images[(theme?.mode)].logo}
              imageStyle={styles.imgLogo}
            />
          </View>

          <View style={styles.bodyContainer}>
            <Text
              h5
              style={styles.title}
              bold2={theme?.mode === 'dark'}
              color={theme?.text?.primaryColor}
            >
              {t('updateApp.title')}
            </Text>

            <Text
              h6
              center
              style={styles.description}
              medium={theme?.mode === 'dark'}
              color={theme?.text?.fourthColor}
            >
              {t('updateApp.description')}
            </Text>
          </View>

          <View style={{marginTop: 25}}>
            <CtGradientButton
              onPress={() => this.onUpdateApp()}
              btnTitle={t('button.updateCapital')}
              loading={loading}
            />
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state)
});

const UpdateAppVersionContainer = connect(mapStateToProps)(UpdateAppVersion);

export default UpdateAppVersionContainer;
