import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';
import { theme } from 'styled-tools';
import { isAndroidPlatform, isIPhoneX } from '@/constants';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
    transparent: {
        backgroundColor: 'transparent'
    },
    containerStyle: theme => ({
        borderBottomWidth: 1,
        borderColor: colors.darkGray,
        backgroundColor: theme?.secondaryBgColor,
        height: isIPhoneX() ? 90 : 80,
        paddingTop: isAndroidPlatform ? StatusBar.currentHeight : 25,
        ...(theme?.mode === 'dark' && {
            borderBottomWidth: 0.5,
            borderBottomColor: colors.dark3,
            marginTop: 0
        })
    }),
    borderBottom: {
        borderBottomWidth: 0
    },
    title: theme => ({
        fontSize: 17,
        marginLeft: 10
    }),
    rightBtn: {
        flexDirection: 'row',
        marginRight: 10
    },
    hasCircle: theme => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 28,
        width: 28,
        borderRadius: 16,
        backgroundColor: theme?.icons.circle.backgroundColor
    }),
    rightBtnTitle: {
        paddingRight: 10,
        paddingTop: 3
    },
    rightContainer: {
        flexDirection: 'row'
    },
    filterColumn: {
        marginRight: 13,
        marginTop: 3
    }
});
