import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { isIPhoneX } from '../../api/helper';
import { fonts } from '../../styles/fonts';

export default styles = StyleSheet.create({

    // Modal
    modalViewContainer: {
        backgroundColor: colors.veryLightGray,
        marginHorizontal: isIPhoneX() ? 20 : 22,
        paddingHorizontal: isIPhoneX() ? 20 : 20,
        paddingTop: isIPhoneX() ? 10 : 10,
        paddingBottom: isIPhoneX() ? 10 : 15,
    },
    bodyContainerStyle: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    // Button
    submitButton: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    handleBtn: {
        paddingHorizontal: 4,
    },
    buttonOutline: {
        borderWidth: 0,
    },

    label: {
        color: colors.dark3,
        fontSize: 20,
        paddingTop: 11,
        paddingBottom: 11,
    },

    heading: {
        color: colors.dark2,
        fontSize: 17,
        fontFamily: fonts.poppins,
        paddingVertical: 5,
    },

    insertFieldContainer: {
        flex: 0,
    },
    buttonContainer: {
        width: 115,
    }
});
