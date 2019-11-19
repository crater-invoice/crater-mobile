import { StyleSheet } from 'react-native';
import { fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    leftTitle: {
        fontSize: 18,
        fontFamily: fonts.poppinsLight,
    },
    rightTitle: {
        fontSize: 18,
        color: colors.dark2,
        fontWeight: '500',
        fontFamily: fonts.poppinsSemiBold,
    },
    containerStyle: {
        alignItems: 'flex-start',
        paddingVertical: 13,
        paddingHorizontal: 20,
    },
    containerWithAvatar: {
        paddingVertical: 13,
        paddingHorizontal: 20,
    },
    checkboxContainerStyle: {
        padding: 0,
        margin: 0,
        paddingTop: 5,
        marginHorizontal: 0,
        paddingHorizontal: 0
    },
    checkboxContainerPadding: {
        paddingTop: 12,
    },
    rightSubTitle: {
        fontSize: 13,
        color: '#8e95ac',
    },
    leftSubTitleText: {
        fontSize: 14,
        color: colors.darkGray,
    },
    leftSubTitleLabelContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 6,
    },
    leftSubTitleLabel: {
        textTransform: 'uppercase',
        fontFamily: fonts.poppins,
        fontSize: 12,
    },
    success: {
        backgroundColor: colors.successLight2,
        color: colors.successDark,
    },
    warning: {
        backgroundColor: colors.warningLight,
        color: colors.warningDark,
    },
    danger: {
        backgroundColor: colors.dangerLight,
        color: colors.dangerDark,
    },
    labelInnerContainerStyle: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 1,
    },
    leftSubTitleContainer: {
        paddingLeft: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
    },
    rightContentContainer: {
        flex: 1,
    }
});
