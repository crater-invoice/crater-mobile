import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

export default StyleSheet.create({
    hint: {
        color: colors.secondary,
        fontSize: 14,
        fontFamily: fonts.poppinsMedium,
    },
    hintFocused: {
        opacity: 1,
    },
    required: {
        color: colors.danger
    },
    inputFieldWrapper: {
        flexShrink: 0,
        marginVertical: 10,
    },
    inputWrapper: {
        flexShrink: 0,
        position: 'relative',
        marginTop: 6,
    },
    input: {
        color: colors.dark2,
        fontSize: 16,
        paddingTop: 1,
        fontFamily: fonts.poppins,
        height: 40,
        ...Platform.select({
            android: {
                height: 45,
            },
        }),
    },
    multilineField: {
        paddingHorizontal: 2,
        paddingVertical: 7,
    },
    inputContainerStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.lightGray,
        paddingLeft: 10,
    },
    containerStyle: {
        paddingHorizontal: 0,
    },
    inputPassword: {
        paddingRight: 30,
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
        backgroundColor: colors.danger,
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 33,
        height: 33,
        justifyContent: "center",
        alignItems: "center",
    },
    leftIcon: {
        marginLeft: 5,
        marginRight: 10,
    },
    activeHint: {
        color: colors.white,
    },
    activeInput: {
        // borderColor: colors.white,
    },
    inputTip: {
        color: colors.white,
        opacity: 0.5,
        position: 'absolute',
        top: 38,
        left: 0,
        right: 0,
    },
    dollarFieldInput: {
        paddingLeft: 15,
    },
    percentageFieldInput: {
        paddingLeft: 22,
    },
    signField: {
        position: 'absolute',
        top: 4,
        left: 0,
    },
    optionsList: {
        // maxHeight: 180,
    },
    disabledInput: {
        backgroundColor: colors.lightGray,
        opacity: 0.5
    },
    lightThemeDisabledInput: {
        color: colors.gray6,
    },
    pointIcon: {
        position: 'absolute',
        top: 3,
    },
    value: {
        color: colors.danger,
        fontWeight: '600',
    },
    additionalValue: {
        opacity: 0.7,
    },
});
