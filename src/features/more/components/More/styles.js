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
    listViewContainer: {
        flex: 1,
    },
    listViewScrollContainerStyle: {
        paddingTop: 10
    },
    listViewTitle: {
        fontFamily: fonts.poppins,
        color: colors.secondary
    },
    listViewIcon: {
        width: 28,
        height: 29,
        textAlign: "center",
    },
    itemContainer: {
        marginVertical: -4,
    },
    dividerStyle: {
        marginTop: 10
    }
});
