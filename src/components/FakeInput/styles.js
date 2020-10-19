import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '@/styles';

export default StyleSheet.create({
    container: {
        marginTop: 10,
        position: 'relative'
    },
    label: {
        paddingBottom: 7,
        color: colors.dark2,
        fontSize: 14,
        fontFamily: fonts.poppins,
    },
    required: {
        color: colors.danger
    },
    fakeInput: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 8,
        ...Platform.select({
            ios: {
                paddingTop: 11,
                paddingBottom: 9,
            },
        }),
        paddingRight: 5,
        borderWidth: 1,
        borderColor: colors.lightGray,
        backgroundColor: colors.white,
        marginBottom: 10,
    },
    loadingFakeInput: {
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: colors.lightGray,
        backgroundColor: colors.white,
        marginBottom: 10,
    },
    textValue: {
        paddingLeft: 10,
        color: colors.secondary,
        fontSize: 15,
        fontFamily: fonts.poppins,
    },
    placeholderText: {
        paddingLeft: 10,
        color: colors.darkGray,
        fontSize: 15,
        fontFamily: fonts.poppins,
    },
    hasRightIcon: {
        paddingRight: 15,
    },
    rightIcon: {
        position: 'absolute',
        top: 13,
        right: 11,
        ...Platform.select({
            android: {
                top: 14,
                right: 11
            },
        }),
    },
    leftIcon: {
        position: 'absolute',
        zIndex: 20,
        left: 15,
        top: 13,
        fontSize: 16,
        ...Platform.select({
            android: {
                left: 15,
                top: 14
            },
        }),
    },
    validation: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: -6,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 2,
        overflow: 'hidden',
        flex: 1,
        zIndex: 100,
        backgroundColor: colors.danger,
    },
    inputError: {
        borderColor: colors.dangerLight
    },
    disabledSelectedValue: {
        backgroundColor: colors.lightGray
    },
    pickerError: {
        borderColor: colors.dangerLight,
        borderWidth: 1,
    },

    // Prefix Auto Generate
    prefixInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 8,
        ...Platform.select({
            ios: {
                paddingTop: 11,
                paddingBottom: 9,
            },
        }),
        paddingRight: 5,
        borderWidth: 1,
        borderColor: colors.lightGray,
        backgroundColor: colors.white,
        marginBottom: 10,
    },
    prefixLabelContainer: {
        marginTop: 1,
    },
    prefixInputContainer: {
        flex: 1
    },
    prefixInputContainerStyle: {
        borderWidth: 0,
        borderBottomWidth: 0,
        paddingLeft: 0,
    },
    prefixInputFieldStyle: {
        marginTop: -14,
        marginBottom: -10,
    },
    prefixInputText: {
        fontSize: 16.5,
        ...Platform.select({
            android: {
                marginTop: 1,
                fontSize: 17,
            },
        }),
    },
    prefixLeftIcon: {
        position: 'absolute',
        zIndex: 20,
        left: 14,
        top: 3,
        fontSize: 16,
        ...Platform.select({
            android: {
                left: 14,
                top: 5
            },
        }),
    },
});
