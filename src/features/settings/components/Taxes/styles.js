import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    mainContainer: {
        paddingHorizontal: 20
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray
    },
    submitButton: {
        paddingHorizontal: 10
    },
    listViewContainer: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0
    }
});
