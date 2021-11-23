import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from '../navigation-routes';
import {navigatorOptions as options} from '../navigation-action';
import UpdateAppVersion from 'screens/update-app-version';
import {Login, ForgotPassword} from 'screens/auth';
import Endpoint from 'screens/endpoint';
import LostConnection from 'screens/lost-connection';

const AuthStack = createStackNavigator();

export const AuthNavigator = (
  <>
    <AuthStack.Screen name={routes.LOGIN} component={Login} />
    <AuthStack.Screen
      name={routes.FORGOT_PASSWORD}
      component={ForgotPassword}
      options={options}
    />
    {/* Settings Navigator */}
    <AuthStack.Screen
      name={routes.UPDATE_APP_VERSION}
      component={UpdateAppVersion}
    />
    <AuthStack.Screen
      name={routes.ENDPOINTS}
      component={Endpoint}
      options={options}
    />
    <AuthStack.Screen
      name={routes.LOST_CONNECTION}
      component={LostConnection}
      options={{gestureEnabled: false}}
    />
  </>
);
