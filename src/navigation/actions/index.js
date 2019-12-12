
import { BackHandler } from 'react-native';
import { NavigationActions, createStackNavigator, StackActions } from "react-navigation";
import { ROUTES } from "../routes";
import { store } from '../../store';
import Lng from '../../api/lang/i18n';
import { alertMe } from '../../api/global';


export const navigateBack = () => NavigationActions.back();

export const navigateTo = (routeName) => {
    NavigationActions.navigate({ routeName });
}

// Exit Crater App
// -----------------------------------------
export const exitApp = () => {
    alertMe({
        title: getTitleByLanguage("alert.exit"),
        okText: "Exit",
        okPress: () => BackHandler.exitApp(),
        showCancel: true
    })
}

// Go Back Navigation
// -----------------------------------------
export const MOUNT = 'mount'
export const UNMOUNT = 'unMount'

export const goBack = (type, navigation = {}, params) => {

    const { route = null, callback = null, exit = false } = params || {}

    if (type === MOUNT) {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => {

                if (params && exit) {
                    exitApp()
                    return true
                }

                if (params && callback && typeof callback === 'function' && getCurrentRouteName() !== ROUTES.ESTIMATE_LIST) {
                    getCurrentRouteName() !== ROUTES.MAIN_TABS ?
                        callback() : exitApp()
                    return true
                }

                if (params && route && typeof route === 'string') {
                    navigateToMainTabs(navigation, route)
                } else {
                    navigation.goBack(null);
                }

                return true;
            })
    } else {
        this.backHandler.remove()
    }
}

export const getCurrentRouteName = () => {
    const reduxStore = store.getState();
    const { routes } = reduxStore.nav
    const currentRoteBlock = routes[routes.length - 1];
    return currentRoteBlock.routeName;
}

export const navigateToMainTabs = (navigation, route = null) => {
    let action = {}
    if (route) {
        action = {
            action: navigation.navigate({ routeName: route })
        }
    }
    const resetAction = StackActions.reset({
        index: 1,
        actions: [
            NavigationActions.navigate({ routeName: ROUTES.AUTH }),
            NavigationActions.navigate({
                routeName: ROUTES.MAIN_TABS,
                ...action
            }),
        ],
    });
    navigation.dispatch(resetAction);
}


export const generateStackNavigation = (route, screen) => createStackNavigator(
    {
        [route]: screen,
    },
    {
        initialRouteName: route,
        navigationOptions: {
            header: null,
            headerTransparent: true,
        },
    }
);

// Navigate Specific Route
// -----------------------------------------
export const navigateRoute = (routeName, params = {}) => {
    store.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        }),
    );
}

// onPress BottomTabNavigator
// -----------------------------------------
export const tabBarOnPress = (routeName = '', action = '') => {

    routeName && navigateRoute(routeName, { loading: true })

    let activeTabIfInvoices = ''

    if (routeName === ROUTES.MAIN_INVOICES) {
        const reduxStore = store.getState();
        activeTabIfInvoices = reduxStore.invoices.activeTab
    }

    store.dispatch(action({
        type: activeTabIfInvoices,
        onMeta: ({ last_page, current_page }) => {
            let pagination = { last_page, current_page }
            routeName && navigateRoute(routeName, { pagination, loading: false })
        }
    }))
}


// Get Value with translated
// -----------------------------------------
export const getTitleByLanguage = (label) => {
    const reduxStore = store.getState();
    const { language = 'en' } = reduxStore.global

    return Lng.t(label, { locale: language })
}
