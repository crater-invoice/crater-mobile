import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';

export default styles = StyleSheet.create({


    required: {
        color: colors.danger
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17,
    },
    dateFieldContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: -10,
    },
    dateField: {
        flex: 1,
        paddingHorizontal: 7,
        justifyContent: 'space-between',
    },
    inputTextStyle: {
        color: colors.dark3,
        fontFamily: fonts.poppinsMedium,
    },
    noteHintStyle: {
        paddingBottom: 6,
        color: colors.dark2,
        fontSize: 14,
        fontFamily: fonts.poppins,
    },
    submitButton: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    handleBtn: {
        marginHorizontal: 9,
    },
    buttonContainer: {
        flex: 1,
    },
    itemContainer: {
        marginVertical: 4,
        borderWidth: 1,
        borderColor: colors.lightGray
    },
    itemLeftTitle: {
        fontSize: 15,
        fontFamily: fonts.poppins,
        color: colors.dark
    },
    itemLeftSubTitleLabel: {
        marginLeft: -6,
    },
    itemLeftSubTitle: {
        color: colors.darkGray,
        fontSize: 13,
    },
    itemRightTitle: {
        fontFamily: fonts.poppins,
        fontSize: 18,
        color: colors.secondary
    },
    label: {
        paddingBottom: 10,
        paddingTop: 15,
    },
    termsEditText: {
        color: colors.primary
    }
});
