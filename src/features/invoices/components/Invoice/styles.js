import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';
import { SymbolStyle } from '../../../../components/CurrencyFormat/styles';

const { width } = Dimensions.get('window');

export const itemsDescriptionStyle = (widthMinus = 43) => {
    return {
        width: width - widthMinus,
        textAlign: "justify"
    }
}
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    headerTitle: {
        fontSize: 17,
        color: colors.dark1,
    },
    headerContainer: {
        // backgroundColor: colors.veryLightGray,
    },
    discount: {
        marginTop: 10,
    },
    required: {
        color: colors.danger
    },
    selectPickerField: {
        backgroundColor: colors.veryLightGray,
        paddingRight: 15,
        paddingLeft: 5,
        ...Platform.select({
            ios: {
                paddingRight: 30,
            },
        }),
        borderLeftWidth: 0,
    },
    fieldStyle: {
        display: 'flex',
        minWidth: 80,
        marginTop: -6,
    },
    discountField: {
        display: 'flex',
        flexDirection: 'row'
    },
    taxFakeInput: {
        color: colors.primary,
        textAlign: 'right',
        fontFamily: fonts.poppinsMedium,
        fontSize: 16,
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
    inputFieldStyle: {
        borderRadius: 0,
    },
    inputFieldContainer: {
        paddingHorizontal: 0,
    },
    inputTextStyle: {
        color: colors.dark3,
        fontFamily: fonts.poppinsMedium,
    },
    inputFieldValidation: {
        marginHorizontal: 0,
    },
    hintStyle: {
        marginTop: -6,
        paddingBottom: 6,
        color: colors.dark2,
        fontSize: 14,
        fontFamily: fonts.poppins,
    },
    noteHintStyle: {
        paddingBottom: 6,
        color: colors.dark2,
        fontSize: 14,
        fontFamily: fonts.poppins,
    },

    amountContainer: {
        borderWidth: 0.8,
        borderColor: colors.lightGray,
        marginTop: 24,
        marginBottom: 10,
        padding: 20,
        backgroundColor: colors.white,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amountHeading: {
        color: colors.darkGray,
        fontFamily: fonts.poppinsMedium,
        marginTop: 6,
    },
    subAmount: {
        color: colors.dark2,
        fontSize: 16,
    },
    finalAmount: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: fonts.poppinsMedium,
    },
    divider: {
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
        borderWidth: 0.7,
        marginTop: 10,
        marginBottom: 8,
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
        paddingBottom: 4,
        paddingTop: 12,
    },
    SelectPickerContainer: {
        marginTop: 0
    },
    fakeInputValueStyle: {
        fontSize: 18,
        ...Platform.select({
            android: {
                marginTop: -2,
            },
        }),
        ...SymbolStyle
    },
});
