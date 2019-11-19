
import { BackHandler } from 'react-native';
import { NavigationActions, createStackNavigator } from "react-navigation";
import { ROUTES } from "../routes";
import { store } from '../../store';
import Lng from '../../api/lang/i18n';


export const navigateBack = () => NavigationActions.back();

export const navigateToMainTabs = () => {
    NavigationActions.navigate({
        routeName: ROUTES.MAIN_TABS
    });
}
export const navigateTo = (routeName) => {
    NavigationActions.navigate({ routeName });
}


// Go Back Navigation
// -----------------------------------------


export const MOUNT = 'mount'
export const UNMOUNT = 'unMount'
export const ANDROID_BACK = 'ANDROID_BACK'

export const goBackWithFunction = (param, navigation = {}, args = '') => {

    if (param === MOUNT) {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => {

                let currentRoute = getCurrentRouteName()

                // Estimates 
                currentRoute === ROUTES.ESTIMATE && args()
                currentRoute === ROUTES.ESTIMATE_LIST && navigation.navigate(ROUTES.MAIN_MORE)

                // Invoices 
                currentRoute === ROUTES.INVOICE && args()
                currentRoute === ROUTES.MAIN_INVOICES && navigation.navigate(ROUTES.MAIN_INVOICES)

                return true;
            }
        )
    } else {
        this.backHandler.remove()
    }

}

export const goBack = (param, navigation = {}, route = '') => {

    if (param === MOUNT) {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => {
                route && typeof route === 'string' ? navigation.navigate(route)
                    : navigation.goBack(null);

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

export const navigateTabRoutes = (exceptRouteName, params = {}) => {
    let routes = [
        ROUTES.MAIN_INVOICES,
        ROUTES.MAIN_CUSTOMERS,
        ROUTES.MAIN_PAYMENTS,
        ROUTES.MAIN_EXPENSES
    ]

    routes.map(route => {
        !(route === exceptRouteName) && store.dispatch(
            NavigationActions.navigate({
                routeName: route,
                params
            }),
        );
    })

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