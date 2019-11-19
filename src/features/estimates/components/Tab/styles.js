import { StyleSheet } from 'react-native';
import { isIPhoneX } from '../../../../api/helper';

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0,
    },
});
