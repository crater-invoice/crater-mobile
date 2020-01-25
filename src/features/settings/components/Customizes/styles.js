import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';

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
        color: colors.secondary
    },
    listViewContainer: {
        marginTop: 20
    },
    listViewIcon: {
        width: 25,
    }
});
