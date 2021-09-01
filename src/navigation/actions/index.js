import {BackHandler} from 'react-native';
import {
  NavigationActions,
  createStackNavigator,
  StackActions
} from 'react-navigation';
import {ROUTES} from '../routes';
import {store} from '@/stores';
import {alertMe} from '@/constants';
import t from 'locales/use-translation';

export const navigateBack = () => NavigationActions.back();

export const navigateTo = routeName => {
  NavigationActions.navigate({routeName});
};

// Exit Crater App
// -----------------------------------------
export const exitApp = () => {
  alertMe({
    title: t('alert.exit'),
    okText: 'Exit',
    okPress: () => BackHandler.exitApp(),
    showCancel: true
  });
};

// Go Back Navigation
// -----------------------------------------
export const MOUNT = 'mount';
export const UNMOUNT = 'unMount';

export const goBack = (type, navigation = {}, params) => {
  const {route = null, callback = null, exit = false} = params || {};

  if (type === MOUNT) {
    try {
      this.backHandler = BackHandler?.addEventListener?.(
        'hardwareBackPress',
        () => {
          if (params && exit) {
            exitApp();
            return true;
          }

          if (
            params &&
            callback &&
            typeof callback === 'function' &&
            getCurrentRouteName() !== ROUTES.ESTIMATE_LIST
          ) {
            getCurrentRouteName() !== ROUTES.MAIN_TABS ? callback() : exitApp();
            return true;
          }

          if (params && route && typeof route === 'string') {
            navigation.navigate(route);
          } else {
            navigation.goBack(null);
          }

          return true;
        }
      );
    } catch (e) {}
  } else {
    try {
      this.backHandler.remove();
    } catch (e) {}
  }
};

export const getCurrentRouteName = () => {
  const reduxStore = store.getState();
  const {routes} = reduxStore.nav;
  const currentRoteBlock = routes[routes.length - 1];
  return currentRoteBlock.routeName;
};

export const navigateToMainTabs = (navigation, route = null) => {
  let action = {};
  if (route) {
    action = {
      action: navigation.navigate({routeName: route})
    };
  }
  const resetAction = StackActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({routeName: ROUTES.AUTH}),
      NavigationActions.navigate({
        routeName: ROUTES.MAIN_TABS,
        ...action
      })
    ]
  });
  navigation.dispatch(resetAction);
};

export const generateStackNavigation = (route, screen) =>
  createStackNavigator(
    {
      [route]: screen
    },
    {
      initialRouteName: route,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    }
  );

// Navigate Specific Route
// -----------------------------------------
export const navigateRoute = (routeName, params = {}) => {
  store.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

export const resetNavigation = ({navigation, route, index = 0}) => {
  const resetAction = StackActions.reset({
    index,
    actions: [NavigationActions.navigate({routeName: route})]
  });
  navigation.dispatch(resetAction);
};
