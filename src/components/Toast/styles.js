import { isIosPlatform, isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export const styles = StyleSheet.create({
    animatedToastView: {
        marginHorizontal: 22,
        paddingHorizontal: 25,
        paddingVertical: 11,
        borderRadius: 25,
        zIndex: 9999,
        position: 'absolute',
        bottom: isIPhoneX() ? 130 : 100,
        left: 0,
        right: 0,
        backgroundColor: colors.veryDarkGray,
        justifyContent: 'center'
    },

    title: {
        fontSize: isIPhoneX() ? 15 : 13,
        alignSelf: 'stretch',
        paddingTop: isIosPlatform() ? 1 : 3
    }
});
