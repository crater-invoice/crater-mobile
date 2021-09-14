import {isAndroidPlatform} from '@/constants';
import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from './navigation-routes';
import {TabNavigator} from './navigators/tab-navigator';
import {AuthNavigator} from './navigators/auth-navigator';
import {CommonNavigator} from './navigators/common-navigator';
import {navigationRef} from './navigation-action';

const Stack = createStackNavigator();

export default props => {
  const {isLogin, endpointApi} = props;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (isAndroidPlatform) {
      Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
      Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    }
    return () => {};
  }, []);

  let Navigator: any;

  if (isLogin) {
    Navigator = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.MAIN_TABS}>
        {TabNavigator({...props, isKeyboardVisible})}
        {CommonNavigator}
      </Stack.Navigator>
    );
  } else if (!endpointApi) {
    Navigator = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.ENDPOINTS}>
        {AuthNavigator}
      </Stack.Navigator>
    );
  } else {
    Navigator = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.LOGIN}>
        {AuthNavigator}
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>{Navigator}</NavigationContainer>
  );
};
