import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray
    },
    listViewTitle: theme => ({
        fontFamily:
            theme?.mode === 'light' ? fonts.poppins : fonts.poppinsMedium,
        color: theme?.listItem?.secondary?.color,
        marginLeft: isIPhoneX() ? 0 : -4,
        marginRight: isIPhoneX() ? 0 : -11,
        textAlign: 'left'
    }),
    listViewIcon: {
        width: 26,
        textAlign: 'center'
    },
    itemContainer: {
        marginVertical: -2
    }
});
