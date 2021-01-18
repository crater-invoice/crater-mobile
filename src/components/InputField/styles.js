import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '@/styles';
import { isRTL } from '@/utils';

export default StyleSheet.create({
    hintFocused: {
        opacity: 1
    },
    inputFieldWrapper: {
        flexShrink: 0,
        marginVertical: 10
    },
    inputWrapper: {
        flexShrink: 0,
        position: 'relative',
        marginTop: 6
    },
    input: {
        color: colors.dark2,
        fontSize: 16,
        paddingTop: 1,
        fontFamily: fonts.poppins,
        textAlign: 'left',
        height: 40,
        ...Platform.select({
            android: {
                height: 45
            }
        }),
        ...(isRTL() && {
            writingDirection: 'rtl',
            textAlign: 'right'
        })
    },
    multilineField: {
        paddingHorizontal: 2,
        paddingTop: 6,
        paddingBottom: 5
    },
    inputContainerStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.lightGray,
        paddingLeft: 10
    },
    containerStyle: {
        paddingHorizontal: 0
    },
    inputPassword: {
        paddingRight: 30
    },
    inputError: {
        borderColor: colors.dangerLight
    },
    validation: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 2,
        overflow: 'hidden',
        flex: 1,
        zIndex: 100,
        backgroundColor: colors.danger
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 33,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftIcon: {
        marginLeft: 5,
        marginRight: 10
    },
    activeHint: {
        color: colors.white
    },
    activeInput: {
        // borderColor: colors.white,
    },
    inputTip: {
        opacity: 0.5,
        top: 38,
        left: 0,
        right: 0
    },
    dollarFieldInput: {
        paddingLeft: 15
    },
    percentageFieldInput: {
        paddingLeft: 22
    },
    signField: {
        top: 4,
        left: 0
    },
    optionsList: {
        // maxHeight: 180,
    },
    disabledInput: {
        backgroundColor: colors.lightGray,
        opacity: 0.5
    },
    lightThemeDisabledInput: {
        color: colors.gray6
    },
    pointIcon: {
        position: 'absolute',
        top: 3
    },
    value: {
        color: colors.danger,
        fontWeight: '600'
    },
    additionalValue: {
        opacity: 0.7
    },
    // left Symbol
    leftSymbol: {
        fontSize: 20
    },
    leftSymbolView: {
        height: '100%',
        marginLeft: -20,
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 10,
        paddingRight: 5
    }
});
