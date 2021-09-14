import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routes} from '..';
import BottomTab from '../navigation-bottom-tab';
import Invoices from '../../features/invoices/containers/Invoices';
import Customers from '../../features/customers/containers/Customers';
import Payments from '../../features/payments/containers/Payments';
import Expenses from '../../features/expenses/containers/Expenses';
import More from '../../features/more/containers/More';

const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();

function TabNavigator(props) {
  return (
    <Stack.Screen name={routes.MAIN_TABS}>
      {() => (
        <TabStack.Navigator
          initialRouteName={routes.MAIN_EXPENSES}
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
}

export default TabNavigator;
