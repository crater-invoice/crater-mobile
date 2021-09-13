import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Keyboard} from 'react-native';

// import BOTTOM_TAB_BAR from './tab';
// import {AssetSvg} from '@/components';
import {Colors, isAndroidPlatform} from '@/constants';
import {routes} from '@/navigation/routes';
import {BasketIcon, ExploreIcon, UserIcon, MyOrderIcon} from '@/icons';
// import {navigationRef, listOfStates} from './action';

// auth
import Login from '@/features/authentication/containers/Login';
import ForgotPassword from '@/features/authentication/containers/ForgetPassword';
import Endpoint from '@/features/authentication/containers/Endpoint';

import UpdateApp from '@/components/UpdateAppVersion';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const BasketStack = createStackNavigator();
const SettingStack = createStackNavigator();
const MyOrdersStack = createStackNavigator();
const TabStack = createBottomTabNavigator();

const options = {
  animationEnabled: true,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS
};

// const HOME_TAB = () => (
//   <HomeStack.Navigator initialRouteName={routes.MAIN_HOME} headerMode="none">
//     <HomeStack.Screen
//       name={routes.MAIN_HOME}
//       component={Dashboard}
//       options={options}
//     />
//     <HomeStack.Screen
//       name={routes.CATEGORIES}
//       component={Categories}
//       options={options}
//     />
//     <HomeStack.Screen
//       name={routes.PRODUCTS}
//       component={Products}
//       options={options}
//     />
//     <HomeStack.Screen
//       name={routes.PRODUCTS_FILTERS}
//       component={ProductsFilters}
//       options={options}
//     />
//     <HomeStack.Screen
//       name={routes.PRODUCT}
//       component={Product}
//       options={options}
//     />
//   </HomeStack.Navigator>
// );

// const BASKET_TAB = () => (
//   <BasketStack.Navigator
//     initialRouteName={routes.MAIN_BASKET}
//     headerMode="none"
//   >
//     <BasketStack.Screen
//       name={routes.MAIN_BASKET}
//       component={Basket}
//       options={options}
//     />
//     <BasketStack.Screen
//       name={routes.PRODUCT}
//       component={Product}
//       options={options}
//     />
//     <BasketStack.Screen
//       name={routes.ORDER_SUBMITTED}
//       component={OrderSubmitted}
//       options={options}
//     />
//     <BasketStack.Screen
//       name={routes.ORDER_REVIEW}
//       component={OrderReview}
//       options={options}
//     />
//     <BasketStack.Screen
//       name={routes.PAYTM_SUCCESS}
//       component={PaytmSuccess}
//       options={options}
//     />
//     <BasketStack.Screen
//       name={routes.BANK_DETAILS}
//       component={BankDetails}
//       options={options}
//     />
//     <BasketStack.Screen
//       name={routes.CUSTOMERS}
//       component={Customers}
//       options={options}
//     />
//   </BasketStack.Navigator>
// );

// const SETTINGS_TAB = () => (
//   <SettingStack.Navigator
//     initialRouteName={routes.MAIN_SETTINGS}
//     headerMode="none"
//   >
//     <SettingStack.Screen
//       name={routes.MAIN_SETTINGS}
//       component={Setting}
//       options={options}
//     />
//     <SettingStack.Screen
//       name={routes.PROFILE}
//       component={Profile}
//       options={options}
//     />
//     <SettingStack.Screen
//       name={routes.CHANGE_PASSWORD}
//       component={ChangePassword}
//       options={options}
//     />
//     <SettingStack.Screen
//       name={routes.CHANGE_LANGUAGE}
//       component={ChangeLanguage}
//       options={options}
//     />

//     <SettingStack.Screen
//       name={routes.CONTACT_US}
//       component={ContactUs}
//       options={options}
//     />
//   </SettingStack.Navigator>
// );

// const MY_ORDERS_TAB = () => (
//   <MyOrdersStack.Navigator
//     initialRouteName={routes.MAIN_MY_ORDERS}
//     headerMode="none"
//   >
//     <MyOrdersStack.Screen
//       name={routes.MAIN_MY_ORDERS}
//       component={Orders}
//       options={options}
//     />
//     <MyOrdersStack.Screen
//       name={routes.ORDER}
//       component={Order}
//       options={options}
//     />
//     <MyOrdersStack.Screen
//       name={routes.BANK_DETAILS}
//       component={BankDetails}
//       options={options}
//     />
//     <MyOrdersStack.Screen
//       name={routes.PAYTM_SUCCESS}
//       component={PaytmSuccess}
//       options={options}
//     />
//   </MyOrdersStack.Navigator>
// );

// const Icon = (icon, color, size) => (
//   <AssetSvg name={icon(color)} width={size} height={size} />
// );

const globalNavigator = (
  <>
    <Stack.Screen name={routes.UPDATE_APP_VERSION} component={UpdateApp} />
    <Stack.Screen
      name={routes.ENDPOINTS}
      component={Endpoint}
      options={options}
    />
  </>
);

const authNavigator = (
  <>
    <Stack.Screen name={routes.LOGIN} component={Login} options={options} />
    <Stack.Screen
      name={routes.FORGOT_PASSWORD}
      component={ForgotPassword}
      options={options}
    />
  </>
);

// const homeNavigator = data => (
//   <Stack.Screen name={routes.MAIN_HOME}>
//     {() => (
//       <TabStack.Navigator
//         initialRouteName={routes.MAIN_HOME}
//         lazy={false}
//         tabBarOptions={{
//           activeTintColor: Colors.danger,
//           inactiveTintColor: Colors.grayDark
//         }}
//         backBehavior="history"
//         tabBar={options => <BOTTOM_TAB_BAR {...options} {...data} />}
//       >
//         <TabStack.Screen
//           name={routes.MAIN_HOME}
//           component={HOME_TAB}
//           options={{
//             tabBarLabel: 'tabs.explore',
//             tabBarIcon: ({color, size}) => Icon(ExploreIcon, color, size)
//           }}
//         />
//         <TabStack.Screen
//           name={routes.MAIN_BASKET}
//           component={BASKET_TAB}
//           options={{
//             tabBarLabel: 'tabs.basket',
//             tabBarIcon: ({color, size}) => Icon(BasketIcon, color, size)
//           }}
//         />
//         <TabStack.Screen
//           name={routes.MAIN_MY_ORDERS}
//           component={MY_ORDERS_TAB}
//           options={{
//             tabBarLabel: 'tabs.myOrders',
//             tabBarIcon: ({color, size}) => Icon(MyOrderIcon, color, size)
//           }}
//         />
//         <TabStack.Screen
//           name={routes.MAIN_SETTINGS}
//           component={SETTINGS_TAB}
//           options={{
//             tabBarLabel: 'tabs.profile',
//             tabBarIcon: ({color, size}) => Icon(UserIcon, color, size)
//           }}
//         />
//       </TabStack.Navigator>
//     )}
//   </Stack.Screen>
// );

type Props = {
  idToken: string,
  locale: string,
  hasLogout: boolean
};

type State = {
  isKeyboardOpen: boolean
};

export default class extends Component<Props, State> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  constructor(props) {
    super(props);
    this.state = {
      isKeyboardOpen: false
    };
  }

  async componentDidMount() {
    try {
      if (isAndroidPlatform) {
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => this.setState({isKeyboardOpen: true})
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => this.setState({isKeyboardOpen: false})
        );
      }
    } catch (e) {}
  }

  componentWillUnmount() {
    if (isAndroidPlatform) {
      this.keyboardDidShowListener?.remove?.();
      this.keyboardDidHideListener?.remove?.();
    }
  }

  render() {
    const {idToken, locale, hasLogout} = this.props;
    const {isKeyboardOpen} = this.state;

    const homeNavigatorData = {
      locale,
      isKeyboardOpen
    };

    let NAVIGATE_SCREEN: any;

    NAVIGATE_SCREEN = (
      <Stack.Navigator headerMode="none" initialRouteName={routes.LOGIN}>
        {authNavigator}
        {globalNavigator}
      </Stack.Navigator>
    );

    // if (idToken) {
    //   NAVIGATE_SCREEN = (
    //     <Stack.Navigator headerMode="none" initialRouteName={routes.MAIN_TABS}>
    //       {homeNavigator(homeNavigatorData)}
    //       {globalNavigator()}
    //     </Stack.Navigator>
    //   );
    // } else if (!idToken && hasLogout) {
    //   NAVIGATE_SCREEN = (
    //     <Stack.Navigator headerMode="none" initialRouteName={routes.LOGIN}>
    //       {authNavigator()}
    //       {globalNavigator()}
    //     </Stack.Navigator>
    //   );
    // } else {
    //   NAVIGATE_SCREEN = (
    //     <Stack.Navigator headerMode="none" initialRouteName={routes.LOGIN}>
    //       {authNavigator()}
    //       {homeNavigator(homeNavigatorData)}
    //       {globalNavigator()}
    //     </Stack.Navigator>
    //   );
    // }
    return (
      <NavigationContainer
      // ref={navigationRef}
      // onStateChange={state => listOfStates(state)}
      >
        {NAVIGATE_SCREEN}
      </NavigationContainer>
    );
  }
}
