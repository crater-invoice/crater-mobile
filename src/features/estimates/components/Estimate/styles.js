import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    inputTextStyle: {
        color: colors.dark3,
        fontFamily: fonts.poppinsMedium,
        textAlign: 'left'
    },
    noteHintStyle: {
        paddingBottom: 6,
        color: colors.dark2,
        fontSize: 14,
        fontFamily: fonts.poppins,
        textAlign: 'left'
    },
    itemContainer: (theme, disabled) => ({
        borderWidth: 1,
        borderColor: theme?.input?.borderColor,
        ...(disabled && {
            opacity: 0.7
        })
    }),
    itemLeftTitle: theme => ({
        fontSize: 15,
        fontFamily: fonts.poppins,
        color: theme?.listItem?.fifth?.color,
        textAlign: 'left'
    }),
    itemLeftSubTitleLabel: {
        marginLeft: -6
    },
    itemLeftSubTitle: theme => ({
        color: theme?.listItem?.fourth?.color,
        fontSize: 13
    }),
    itemRightTitle: theme => ({
        fontFamily: fonts.poppins,
        fontSize: 18,
        color: theme?.listItem?.secondary?.color,
        textAlign: 'left'
    }),
    label: {
        paddingBottom: -1,
        paddingTop: 12
    }
});
