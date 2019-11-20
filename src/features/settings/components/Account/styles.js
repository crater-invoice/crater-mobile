import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    mainContainer: {
        paddingHorizontal: 20,
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray,
    },
    submitButton: {
        paddingHorizontal: 10
    },
    eyeIcon: {
        top: 6,
    },
    dividerLine: {
        marginVertical: 18,
        backgroundColor: colors.gray,
        borderColor: colors.lightGray,
        borderWidth: 0.2,
    },
    versionContainer: {
        marginVertical: 17,
    },
    versionTitle: {
        color: colors.secondary,
        fontFamily: fonts.poppins,
        fontSize: 16,
    },
    version: {
        fontFamily: fonts.poppinsSemiBold
    }
});
