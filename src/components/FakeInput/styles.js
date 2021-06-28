import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '@/styles';
import { isAndroidPlatform } from '@/constants';

export default StyleSheet.create({
    container: {
        marginTop: 10,
        position: 'relative'
    },
    label: {
        paddingBottom: 7,
        fontSize: 14
    },
    required: {
        color: colors.danger
    },
    fakeInput: theme => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 8,
        ...Platform.select({
            ios: {
                paddingTop: 11,
                paddingBottom: 9
            }
        }),
        paddingRight: 5,
        borderWidth: 1,
        borderColor: theme?.input?.borderColor,
        backgroundColor: theme?.thirdBgColor,
        marginBottom: 10
    }),
    loadingFakeInput: theme => ({
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: theme?.input?.borderColor,
        backgroundColor: theme?.thirdBgColor,
        marginBottom: 10
    }),
    textValue: {
        paddingLeft: 10,
        fontSize: 15
    },
    placeholderText: {
        paddingLeft: 10,
        fontSize: 15
    },
    hasRightIcon: {
        paddingRight: 15
    },
    rightIcon: {
        position: 'absolute',
        top: 13,
        right: 11,
        ...Platform.select({
            android: {
                top: 14,
                right: 11
            }
        })
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
                top: 12
            }
        })
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
        backgroundColor: colors.danger
    },
    inputError: {
        borderColor: colors.dangerLight
    },
    disabledSelectedValue: theme => ({
        backgroundColor: theme?.input?.disableBackgroundColor,
        opacity: 0.7
    }),
    pickerError: {
        borderColor: colors.dangerLight,
        borderWidth: 1
    },

    // Prefix Auto Generate
    prefixInput: theme => ({
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 8,
        ...Platform.select({
            ios: {
                paddingTop: 11,
                paddingBottom: 9
            }
        }),
        paddingRight: 5,
        borderWidth: 1,
        // borderColor: colors.lightGray,
        borderColor: theme?.input?.borderColor,
        backgroundColor: theme?.thirdBgColor,
        marginBottom: 10
    }),
    prefixLabelContainer: {
        marginTop: 1
    },
    prefixInputContainer: {
        flex: 1
    },
    prefixInputContainerStyle: {
        borderWidth: 0,
        borderBottomWidth: 0,
        paddingLeft: 0
    },
    prefixInputFieldStyle: {
        marginTop: -15,
        marginBottom: -10,
        ...(isAndroidPlatform() && {
            marginBottom: -8
        })
    },
    prefixInputText: {
        fontSize: 16.5,
        ...Platform.select({
            android: {
                marginTop: 1,
                fontSize: 17
            }
        })
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
                top: 3.5
            }
        })
    }
});
