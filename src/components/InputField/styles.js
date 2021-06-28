import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '@/styles';
import { isRTL } from '@/utils';
import { isIosPlatform } from '@/constants';

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
    input: theme => ({
        fontSize: 16,
        paddingTop: 1,
        fontFamily:
            theme?.mode === 'light' ? fonts.poppins : fonts.poppinsMedium,
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
    }),
    multilineField: {
        paddingHorizontal: 2,
        paddingTop: 6,
        paddingBottom: 5
    },
    inputContainerStyle: {
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 3
    },
    containerStyle: {
        paddingHorizontal: 0
    },
    inputPassword: {
        paddingRight: 30
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
    disabledInput: theme => ({
        backgroundColor: theme?.input?.disableBackgroundColor,
        opacity: 0.6
    }),
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
        fontSize: 19,
        paddingTop: 3
    },
    leftSymbolView: {
        height: '100%',
        marginLeft: -20,
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 10,
        paddingRight: 5
    },
    withLeftSymbolText: {
        paddingTop: isIosPlatform() ? 1 : 4
    }
});
