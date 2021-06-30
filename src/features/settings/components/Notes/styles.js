import { StyleSheet } from 'react-native';
import { isIPhoneX } from '@/constants';

export default styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0
    }
});
