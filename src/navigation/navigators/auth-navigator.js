import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '..';
import Login from '@/features/authentication/containers/Login';
import ForgotPassword from '@/features/authentication/containers/ForgetPassword';
import {navigatorOptions as options} from '../navigation-action';
import CommonNavigator from './common-navigator';

const Stack = createStackNavigator();

function AuthNavigator({initialRouteName}) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
      <Stack.Screen name={routes.LOGIN} component={Login} options={options} />
      <Stack.Screen
        name={routes.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={options}
      />
      {CommonNavigator()}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
