import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    mainContainer: {
        paddingHorizontal: 20,
        marginTop: 15
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray
    },
    submitButton: {
        paddingHorizontal: 10
    },
    dividerLine: {
        marginTop: 18,
        marginBottom: 18,
        backgroundColor: colors.gray,
        borderColor: colors.gray,
        borderWidth: 0.2
    }
});
