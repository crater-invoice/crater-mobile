import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';
import { isIPhoneX } from '../../../../api/helper';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray,
    },
    listViewTitle: {
        fontFamily: fonts.poppins,
        color: colors.secondary,
        marginLeft: isIPhoneX() ? 0 : -4,
        marginRight: isIPhoneX() ? 0 : -11,
    },
    listViewContainer: {
        marginTop: 10,
        marginHorizontal: isIPhoneX() ? 0 : -5,
    },
    listViewIcon: {
        width: 25,
        textAlign: "center",
    },
    itemContainer: {
        marginVertical: -2,
    }
});
