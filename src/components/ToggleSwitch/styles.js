import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { isIosPlatform } from '../../api/helper';

export const styles = StyleSheet.create({
    mainContainer: {
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        marginVertical: 15,
    },
    hintStyle: {
        color: colors.secondary,
        fontFamily: fonts.poppins,
        fontSize: 16,
        marginTop: 3,
        width: '83%'
    },
    switchStyle: {
        transform: isIosPlatform() ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    switchContainer: {
        height: 20,
    },
    descriptionContainer: {
        flex: 1,
        paddingRight: 8,
        marginTop: -5,
    },
    description: {
        textAlign: "justify",
        color: colors.darkGray,
        fontFamily: fonts.poppinsLight,
        fontSize: 14,
    }
});
