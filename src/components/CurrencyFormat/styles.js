import { isIosPlatform } from '@/constants';
import { StyleSheet } from 'react-native';

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
