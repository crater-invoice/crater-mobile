import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import t from 'locales/use-translation';
import {BaseButton, Text, AssetSvg} from '@/components';
import {checkConnection} from '@/constants';
import {LostConnectionIcon} from '@/icons';
import {styles, Container, Center} from './lost-connection-styles';
import {INavigation, ITheme} from '@/interfaces';
import {routes} from '@/navigation';

export default class LostConnection extends Component<IProps, IStates> {
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
      ? navigation.navigate(routes.LOST_CONNECTION)
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
            {t('lost_internet.title')}
          </Text>
          <AssetSvg name={LostConnectionIcon} width={`100%`} height={`25%`} />
          <Text
            light
            center
            style={styles.description}
            color={theme?.text?.thirdColor}
          >
            {t('lost_internet.description')}
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

interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

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
