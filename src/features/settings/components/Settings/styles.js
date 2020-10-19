import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

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
