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

import {IProps, IStates} from './navigation-type';

const Stack = createStackNavigator();

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
    const {isLogin, endpointApi} = this.props;
    const {isKeyboardOpen} = this.state;

    const homeNavigatorData = {
      isKeyboardOpen,
      ...this.props
    };

    let Navigator: any;

    if (isLogin) {
      Navigator = (
        <Stack.Navigator headerMode="none">
          {TabNavigator(homeNavigatorData)}
          {CommonNavigator()}
        </Stack.Navigator>
      );
    } else if (!endpointApi) {
      Navigator = AuthNavigator(routes.ENDPOINTS);
    } else {
      Navigator = AuthNavigator(routes.LOGIN);
    }

    return (
      <NavigationContainer ref={navigationRef}>{Navigator}</NavigationContainer>
    );
  }
}
