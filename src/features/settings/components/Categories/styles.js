import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0
    }
});
