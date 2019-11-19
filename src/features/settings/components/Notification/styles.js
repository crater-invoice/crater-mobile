import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { isIPhoneX } from '../../../../api/helper';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    mainContainer: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray,
    },
    submitButton: {
        paddingHorizontal: 10
    },
    dividerLine: {
        marginTop: 18,
        marginBottom: 18,
        backgroundColor: colors.gray,
        borderColor: colors.gray,
        borderWidth: 0.2,
    },
    toastContainer: {
        bottom: isIPhoneX() ? 40 : 20,
        paddingHorizontal: 13,
    }
});
