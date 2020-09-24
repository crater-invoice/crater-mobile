import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { isIPhoneX, headerTitle } from '../../../../api/helper';
import { fonts } from '../../../../styles/fonts';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray,
    },
    listViewContainer: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0,
    },
    titleStyle: {
        color: colors.dark,
        fontFamily: fonts.poppins,
        ...headerTitle({ marginLeft: -25, marginRight: -25 })
    }
});
