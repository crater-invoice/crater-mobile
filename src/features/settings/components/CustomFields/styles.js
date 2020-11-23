import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray
    },
    listViewContainer: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0
    },
    leftTitleContainer: {
        marginTop: -12
    },
    leftTitleText: {
        width: '140%'
    },
    leftSubTitleText: {
        textTransform: 'capitalize'
    },
    rightTitleText: {
        fontSize: 15
    }
});
