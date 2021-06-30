import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.veryLightGray
    },
    listViewContainer: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0
    }
});
