import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';

export default styles = StyleSheet.create({

    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17,
    },
    submitButton: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    handleBtn: {
        marginHorizontal: 9,
    },
    dividerLine: {
        marginTop: 18,
        marginBottom: 18,
        backgroundColor: colors.gray,
        borderColor: colors.gray,
        borderWidth: 0.2,
    },
    autoGenerateHeader: {
        marginTop: 10,
        color: colors.dark2,
        fontFamily: fonts.poppins,
        fontSize: 21,
    },

    paymentListView: {
        marginBottom: 25
    },
    // row
    rowViewContainer: {
        flex: 1,
        flexDirection: "row"
    },
    rowView: {
        flex: 1
    }
});
