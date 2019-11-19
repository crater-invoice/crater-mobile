import { StyleSheet } from 'react-native';
import { isIosPlatform } from '../../api/helper';

export const SymbolStyle = {
    fontFamily: isIosPlatform() ? 'Arial' : 'sans-serif'
}

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
