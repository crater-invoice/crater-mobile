import { isIPhoneX } from '@/constants';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export const styles = StyleSheet.create({
    page: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    content: {
        flex: 1,
    },
    headerTitleStyle: {
        fontSize: 30,
        color: colors.dark2,
        fontWeight: '600',
        fontFamily: fonts.poppinsMedium
    },
    inputField: {
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginVertical: 8,
    },
    searchFieldContainer: {
        paddingBottom: 5,
    },
    bottomView: {
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingBottom: isIPhoneX() ? 35 : 13,
        borderTopWidth: 1,
        borderColor: colors.lightGray,
    },
    columnSearch: {
        flex: 7,
    },
    columnIcon: {
        flex: 1,
        justifyContent: "center",
    },
});
