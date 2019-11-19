import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    tabs: {
        width: '100%',
        height: 38,
        display: 'flex',
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: colors.darkGray,
        fontFamily: fonts.poppinsSemiBold,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected_tab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
    },
    TabTitle: {
        color: colors.darkGray,
        fontFamily: fonts.poppinsSemiBold,
    },
    selectedTabTitle: {
        color: colors.primary,
    },
});
