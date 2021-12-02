import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {routes} from './navigation-routes';
import {TabNavigator} from './navigators/tab-navigator';
import {AuthNavigator} from './navigators/auth-navigator';
import {CommonNavigator} from './navigators/common-navigator';
import {getActiveMainTab, navigateTo, navigationRef} from './navigation-action';
import {isAndroidPlatform} from '@/helpers/platform';
import {IProps} from './navigation-type.d';

const Stack = createStackNavigator();

export default (props: IProps) => {
  const {isLogin, endpointApi, checkOTAUpdate, fetchBootstrap} = props;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (isAndroidPlatform) {
      Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
      Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    }

    initialActions();
    return () => {};
  }, []);

  const initialActions = async () => {
    if (!isLogin) {
      checkOTAUpdate();
      return;
    }

    const oldActiveTab = getActiveMainTab();
    fetchBootstrap(res => {
      const activeTab = getActiveMainTab();
      oldActiveTab !== activeTab && navigateTo({route: activeTab});
      checkOTAUpdate();
    });
  };

  let Navigators: any;

  if (isLogin) {
    Navigators = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.MAIN_TABS}>
        {TabNavigator({...props, isKeyboardVisible})}
        {CommonNavigator}
      </Stack.Navigator>
    );
  } else if (!endpointApi) {
    Navigators = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.ENDPOINTS}>
        {AuthNavigator}
      </Stack.Navigator>
    );
  } else {
    Navigators = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.LOGIN}>
        {AuthNavigator}
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>{Navigators}</NavigationContainer>
  );
};
