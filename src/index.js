import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import ApplicationNavigator from './navigation/containers';
import { checkOTAUpdate } from './features/authentication/actions';
import { env } from '@/config';
import { loadFonts } from './constants';

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
                store.dispatch(checkOTAUpdate());
            }
        });
    }

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
