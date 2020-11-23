import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationActions } from 'react-navigation';
import { store, persistor } from './store';
import ApplicationNavigator from './navigation/containers';
import { getBootstrap, getAppVersion } from './features/authentication/actions';
import { env } from '@/config';
import { ROUTES } from '@/navigation';
import { hasValue, loadFonts } from './constants';

console.disableYellowBox = true;
console.warn = () => {};

interface IState {
    fontLoaded: boolean;
}

export default class Root extends Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = { fontLoaded: false };
    }

    componentWillMount() {
        loadFonts({
            afterLoad: () => {
                this.setState({ fontLoaded: true });

                const reduxStore = store.getState();
                const { idToken = null } = reduxStore?.auth;
                const { endpointApi = null } = reduxStore?.global;

                if (idToken) {
                    store.dispatch(getBootstrap());
                }

                this.checkAppVersion(endpointApi);
            }
        });
    }

    checkAppVersion = endpointApi => {
        if (!hasValue(endpointApi)) {
            return;
        }

        store.dispatch(
            getAppVersion({
                onResult: ({ version }) => {
                    if (
                        version &&
                        parseInt(env.APP_VERSION) < parseInt(version)
                    ) {
                        store.dispatch(
                            NavigationActions.navigate({
                                routeName: ROUTES.UPDATE_APP_VERSION
                            })
                        );
                    }
                }
            })
        );
    };

    render() {
        const { fontLoaded } = this.state;

        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    {fontLoaded && (
                        <View style={{ flex: 1, position: 'relative' }}>
                            <ApplicationNavigator />
                        </View>
                    )}
                </PersistGate>
            </Provider>
        );
    }
}
