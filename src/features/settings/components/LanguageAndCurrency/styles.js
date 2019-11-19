import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { isIPhoneX } from '../../../../api/helper';
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
    selectedField: {
        paddingLeft: 47,
    },
    titleStyle: {
        color: colors.dark,
        fontFamily: fonts.poppins,
        marginLeft: isIPhoneX() ? 0 : -7,
        marginRight: isIPhoneX() ? 0 : -7,
        textAlign: "center",
    },
});
