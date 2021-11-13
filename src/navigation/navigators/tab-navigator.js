import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routes} from '../navigation-routes';
import BottomTab from '../navigation-bottom-tab';
import {Invoices} from 'screens/invoices';
import {Customers} from 'screens/customers';
import {Expenses} from 'screens/expenses';
import {Payments} from 'screens/payments';
import {More} from 'screens/more';
import {getActiveMainTab} from '../navigation-action';

const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();

export const TabNavigator = props => (
  <Stack.Screen name={routes.MAIN_TABS}>
    {() => (
      <TabStack.Navigator
        initialRouteName={getActiveMainTab()}
        lazy={true}
        backBehavior="history"
        tabBar={options => <BottomTab {...options} {...props} />}
      >
        <TabStack.Screen name={routes.MAIN_INVOICES} component={Invoices} />
        <TabStack.Screen name={routes.MAIN_CUSTOMERS} component={Customers} />
        <TabStack.Screen name={routes.MAIN_PAYMENTS} component={Payments} />
        <TabStack.Screen name={routes.MAIN_EXPENSES} component={Expenses} />
        <TabStack.Screen name={routes.MAIN_MORE} component={More} />
      </TabStack.Navigator>
    )}
  </Stack.Screen>
);
