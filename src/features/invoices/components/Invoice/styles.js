import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    dateFieldContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: -10
    },
    dateField: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'space-between'
    },
    inputTextStyle: {
        color: colors.dark3,
        fontFamily: fonts.poppinsMedium
    },
    noteHintStyle: {
        paddingBottom: 6,
        color: colors.dark2,
        fontSize: 14,
        paddingLeft: 4,
        fontFamily: fonts.poppins
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    handleBtn: {
        marginHorizontal: 9
    },
    buttonContainer: {
        flex: 1
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
        marginLeft: -6
    },
    itemLeftSubTitle: {
        color: colors.darkGray,
        fontSize: 13
    },
    itemRightTitle: {
        fontFamily: fonts.poppins,
        fontSize: 18,
        color: colors.secondary
    },
    label: {
        paddingBottom: 4,
        paddingTop: 12
    },
    termsEditText: {
        color: colors.primary
    },
    insertNote: {
        color: colors.primary,
        fontFamily: fonts.poppins,
        fontSize: 16,
        paddingBottom: 6
    },
    noteContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: -12
    }
});
