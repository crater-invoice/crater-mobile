import { StyleSheet } from 'react-native';
import { isIPhoneX } from '@/constants';

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        height: '100%'
    },
    loader: {
        paddingVertical: 20
    },
    searchLoader: {
        flex: 0,
        marginTop: isIPhoneX() ? '25%' : '20%'
    }
});
