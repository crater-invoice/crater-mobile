import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { fonts } from '@/styles';

export default styles = StyleSheet.create({
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
