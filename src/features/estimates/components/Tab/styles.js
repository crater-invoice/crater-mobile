import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0,
    },
});
