import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles/fonts';
import { definePlatformParam, isIPhoneX, headerTitle } from '../../../api/helper';

export const styles = StyleSheet.create({
    page: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    content: {
        flex: 1,
        paddingTop: definePlatformParam(0, 16),
        marginBottom: isIPhoneX() ? 82 : 52,
    },
    bottomView: {
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingBottom: isIPhoneX() ? 35 : 13,
        borderTopWidth: 1,
        borderColor: colors.lightGray,
    },
    headerTitleStyle: {
        fontSize: 17,
        color: colors.dark1,
        fontFamily: fonts.poppins,
        ...headerTitle({})
    },
    inputField: {
        paddingHorizontal: 19,
        paddingVertical: 0,
        marginVertical: 8,
    },
    searchFieldContainer: {
        // backgroundColor: colors.veryLightGray,
        paddingVertical: 10,
    },
});
