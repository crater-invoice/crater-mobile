import React from 'react';
import {createStackNavigator} from 'react-navigation';
import MainNavigator from './main';

import {routes} from '../routes';
import {PaymentNavigator} from './payment';
import {CustomerNavigator} from './customer';
import AuthNavigator from './auth';
import {InvoiceNavigator} from './invoice';
import {EstimateNavigator} from './estimate';
import {ExpenseNavigator} from './expense';
import {SettingNavigator} from './settings';
import {MoreNavigator} from './more';
import {CommonNavigator} from './common';

const appNavigator = createStackNavigator(
  {
    // Auth
    [routes.AUTH]: {
      screen: AuthNavigator
    },

    // MainTab
    [routes.MAIN_TABS]: {
      screen: MainNavigator
    },

    // Invoice
    ...InvoiceNavigator,

    //  Estimate
    ...EstimateNavigator,

    // Expense
    ...ExpenseNavigator,

    // Setting
    ...SettingNavigator,

    // Customer
    ...CustomerNavigator,

    // Payments
    ...PaymentNavigator,

    // More
    ...MoreNavigator,

    // Common
    ...CommonNavigator
  },
  {
    initialRouteName: routes.AUTH,
    navigationOptions: {
      header: null,
      headerTransparent: true,
      gesturesEnabled: false,
      headerTitleAllowFontScaling: false
    }
  }
);

export default appNavigator;
