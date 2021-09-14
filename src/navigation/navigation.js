import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Keyboard} from 'react-native';

import TabNavigator from './navigators/tab-navigator';
import AuthNavigator from './navigators/auth-navigator';
import CommonNavigator from './navigators/common-navigator';
import {routes} from './navigation-routes';

import {isAndroidPlatform} from '@/constants';
import {navigationRef} from './navigation-action';

const Stack = createStackNavigator();

type IProps = {
  idToken: string,
  locale: string,
  hasLogout: boolean,
  endpointApi: string
};

type IStates = {
  isKeyboardOpen: boolean
};

export default class extends Component<IProps, IStates> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  constructor(props) {
    super(props);
    this.state = {
      isKeyboardOpen: false
    };
  }

  async componentDidMount() {
    isAndroidPlatform && this.keyboardListener();
  }

  componentWillUnmount() {
    if (isAndroidPlatform) {
      this.keyboardDidShowListener?.remove?.();
      this.keyboardDidHideListener?.remove?.();
    }
  }

  keyboardListener = () => {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({isKeyboardOpen: true})
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({isKeyboardOpen: false})
    );
  };

  render() {
    const {idToken, locale, hasLogout, endpointApi} = this.props;
    const {isKeyboardOpen} = this.state;

    const homeNavigatorData = {
      isKeyboardOpen,
      ...this.props
    };

    let Navigator: any;

    if (!endpointApi || hasLogout) {
      Navigator = (
        <AuthNavigator
          initialRouteName={!endpointApi ? routes.ENDPOINTS : routes.LOGIN}
        />
      );
    } else {
      Navigator = (
        <Stack.Navigator headerMode="none" initialRouteName={routes.MAIN_TABS}>
          {TabNavigator(homeNavigatorData)}
          {CommonNavigator()}
        </Stack.Navigator>
      );
    }

    return (
      <NavigationContainer ref={navigationRef}>{Navigator}</NavigationContainer>
    );
  }
}
