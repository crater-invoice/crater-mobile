import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import t from 'locales/use-translation';
import {checkConnection} from '@/constants';
import {Text} from '../Text';
import {BaseButton} from '../base';
import {commonSelector} from 'stores/common/selectors';
import {AssetSvg} from '../asset-svg';
import {LostConnectionIcon} from '@/icons';
import {styles, Container, Center} from './styles';

export class LostConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackClick);
  }

  handleBackClick() {
    return true;
  }

  onRetry = async () => {
    await this.setState({loading: true});
    setTimeout(() => this.setState({loading: false}), 1000);
    const {navigation} = this.props;
    const isConnected = await checkConnection();
    !isConnected
      ? navigation.navigate(ROUTES.LOST_CONNECTION)
      : navigation.pop();
  };

  render() {
    const {theme} = this.props;
    const {loading} = this.state;

    return (
      <Container>
        <Center>
          <Text
            h3
            bold2
            style={styles.title}
            color={theme?.text?.secondaryColor}
          >
            {t('lostInternet.title')}
          </Text>
          <AssetSvg name={LostConnectionIcon} width={`100%`} height={`25%`} />
          <Text
            light
            center
            style={styles.description}
            color={theme?.text?.thirdColor}
          >
            {t('lostInternet.description')}
          </Text>
          <BaseButton
            type="primary-gradient"
            size="lg"
            base-class="width=80% mt-30"
            onPress={this.onRetry}
            loading={loading}
          >
            {t('button.retry')}
          </BaseButton>
        </Center>
      </Container>
    );
  }
}

const mapStateToProps = state => commonSelector(state);

export default connect(mapStateToProps)(LostConnection);
