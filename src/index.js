import React, { Component, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components/native';
import { store, persistor } from './store';
import ApplicationNavigator from './navigation/containers';
import { checkOTAUpdate } from './features/authentication/actions';
import { loadFonts, switchTheme } from './constants';
import { Loading } from './components';
import { colors } from './styles';
import { darkTheme, lightTheme } from './theme';

console.disableYellowBox = true;
console.warn = () => {};

interface IState {
    theme: any;
}

class App extends Component<{}, IState> {
    appearanceListener: any;

    constructor(props) {
        super(props);
        this.state = { theme: null };
    }

    componentDidMount() {
        this.switchCurrentTheme(Appearance.getColorScheme());
        store.dispatch(checkOTAUpdate());

        this.appearanceListener = Appearance.addChangeListener(
            ({ colorScheme }) => {
                this.switchCurrentTheme(colorScheme);
            }
        );
    }

    componentWillUnmount() {
        this.appearanceListener?.remove?.();
    }

    switchCurrentTheme = colorScheme => {
        const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

        this.setState({ theme });
        store.dispatch(switchTheme(theme));
    };

    render() {
        const { theme } = this.state;

        if (!theme) {
            return <Loading color={colors.primaryLight} />;
        }

        return (
            <ThemeProvider theme={theme}>
                <View style={{ flex: 1, position: 'relative' }}>
                    <ApplicationNavigator />
                </View>
            </ThemeProvider>
        );
    }
}

export default () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    useEffect(() => {
        loadFonts({ afterLoad: () => setFontLoaded(true) });
        return () => {};
    }, []);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {fontLoaded && (
                    <AppearanceProvider>
                        <App />
                    </AppearanceProvider>
                )}
            </PersistGate>
        </Provider>
    );
};
