import React, {Component} from 'react';
import {View, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {AssetImage} from '../AssetImage';
import {CtGradientButton} from '../Button';
import t from 'locales/use-translation';
import {checkConnection} from '@/constants';
import {IMAGES} from '@/assets';
import {Text} from '../Text';
import {styles, Container} from './styles';
import {commonSelector} from 'stores/common/selectors';

export class LostConnection extends Component {
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

  onRetry = async () => {
    try {
      const {clickTry} = this.props;
      await this.setState({loading: true});
      const isConnected = await checkConnection();
      if (!isConnected) {
        setTimeout(() => this.setState({loading: false}), 500);
        return;
      }
      await this.setState({loading: false});
      clickTry?.();
    } catch (e) {}
  };

  render() {
    const {theme} = this.props;
    const {loading} = this.state;

    return (
      <Container>
        <View style={styles.main}>
          <View style={styles.bodyContainer}>
            <Text
              bold2
              h3
              style={styles.title}
              color={theme?.text?.secondaryColor}
            >
              {t('lostInternet.title')}
            </Text>

            <View style={styles.logoContainer}>
              <AssetImage
                imageSource={IMAGES.LOST_CONNECTION}
                imageStyle={styles.imgLogo}
              />
            </View>

            <Text
              light
              center
              style={styles.description}
              color={theme?.text?.thirdColor}
            >
              {t('lostInternet.description')}
            </Text>
          </View>

          <View style={{marginTop: 25}}>
            <CtGradientButton
              onPress={() => this.onRetry()}
              btnTitle={t('button.retry')}
              loading={loading}
              style={{paddingVertical: 8}}
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

export default connect(mapStateToProps)(LostConnection);
