import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationActions } from 'react-navigation';
import { store, persistor } from './store';
import { loadFonts } from './api/global';
import ApplicationNavigator from "./navigation/containers";
import { getBootstrap, getAppVersion } from './features/authentication/actions';
import { AppLoader } from './components';
import compareVersion from './api/compareVersion';
import { ROUTES } from './navigation/routes';
import { env } from './config';

console.disableYellowBox = true;

export default class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
        };
    }

    componentWillMount() {
        loadFonts({
            afterLoad: () => {
                const reduxStore = store.getState();

                let { idToken = null } = reduxStore.auth;
                let { endpointApi = null } = reduxStore.global;

                if (idToken) {
                    store.dispatch(getBootstrap())
                }

                if (endpointApi) {
                    (endpointApi !== null && typeof endpointApi !== 'undefined') &&
                    store.dispatch(getAppVersion({
                        onResult: ({ version }) => {
                                if (version && (parseInt(env.APP_VERSION) < parseInt(version))) {
                                    store.dispatch(
                                        NavigationActions.navigate({
                                            routeName: ROUTES.UPDATE_APP_VERSION,
                                        }),
                                    );
                                }
                            }
                        }))
                }
                this.setState({ fontLoaded: true });
            },
        });
    }

    render() {
        const { fontLoaded } = this.state;

        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} >
                    {fontLoaded && (
                        <View style={{ flex: 1, position: 'relative' }}>
                            <ApplicationNavigator />
                            <AppLoader />
                        </View>
                    )}
                </PersistGate>
            </Provider>
        );
    }
}
