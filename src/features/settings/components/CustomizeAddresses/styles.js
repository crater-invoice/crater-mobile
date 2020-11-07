import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },

    addressesContainer: {
        marginTop: 15
    },
    label: {
        paddingBottom: 7,
        color: colors.dark2,
        fontSize: 17,
        fontFamily: fonts.poppinsMedium,
        textAlign: 'left'
    },

    insertFieldContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: colors.darkGray,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        paddingVertical: 4,
        borderBottomWidth: 0
    },
    insertFieldLabelContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        fontFamily: fonts.poppinsLight
    },
    insertFieldButton: {
        flex: 1,
        justifyContent: 'center'
    },

    // Button
    buttonContainer: {
        alignItems: 'flex-end'
    },
    handleBtn: {
        paddingRight: 2
    },
    buttonField: {
        paddingVertical: 7,
        paddingRight: 5
    },
    buttonFieldText: {
        color: colors.dark2,
        fontSize: 15,
        fontFamily: fonts.poppins,
        paddingVertical: 5,
        textAlign: 'left'
    },

    insertFieldLabel: {
        color: colors.dark2,
        fontSize: 15,
        fontFamily: fonts.poppins,
        textAlign: 'left'
    },
    textArea: {
        borderWidth: 0.2,
        marginTop: -16,
        borderTopWidth: 1,
        borderColor: colors.darkGray
    },

    // Modal
    modalViewContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.veryLightGray,
        paddingBottom: isIPhoneX() ? 25 : 5,
        paddingHorizontal: isIPhoneX() ? 8 : 5
    },

    // Modal Select Field
    selectFieldContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: isIPhoneX() ? 10 : 5
    },
    selectFieldContact: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 5
    },

    heading: {
        color: colors.dark2,
        fontSize: 17,
        fontFamily: fonts.poppins,
        paddingVertical: 5,
        textAlign: 'left'
    },
    line: {
        flex: 1,
        borderRightWidth: 0.5,
        borderRightColor: colors.darkGray,
        marginVertical: 10,
        marginHorizontal: 10
    }
});
