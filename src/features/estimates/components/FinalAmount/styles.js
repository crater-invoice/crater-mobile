import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '@/styles';
import { SymbolStyle } from '@/components/CurrencyFormat/styles';

export default styles = StyleSheet.create({
    discount: {
        marginTop: 10
    },
    selectPickerField: {
        backgroundColor: colors.veryLightGray,
        paddingRight: 15,
        paddingLeft: 5,
        ...Platform.select({
            ios: {
                paddingRight: 30
            }
        }),
        borderLeftWidth: 0
    },
    fieldStyle: {
        display: 'flex',
        minWidth: 80,
        marginTop: -6
    },
    discountField: {
        display: 'flex',
        flexDirection: 'row'
    },
    amountContainer: {
        borderWidth: 0.8,
        borderColor: colors.lightGray,
        marginTop: 24,
        marginBottom: 10,
        padding: 20,
        backgroundColor: colors.white
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    amountHeading: {
        marginTop: 6
    },
    subAmount: {
        color: colors.dark2,
        fontSize: 16
    },
    finalAmount: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: fonts.poppinsMedium,
        textAlign: 'left'
    },
    divider: {
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
        borderWidth: 0.7,
        marginTop: 10,
        marginBottom: 8
    },
    SelectPickerContainer: {
        marginTop: 0
    },
    fakeInputValueStyle: {
        fontSize: 18,
        ...Platform.select({
            android: {
                marginTop: -2
            }
        }),
        ...SymbolStyle
    }
});
