import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 22,
        paddingTop: 10,
        paddingBottom: 20
    },
    childContainer: {
        paddingTop: 10,
        paddingHorizontal: 22,
        flex: 1
    },
    dividerLine: {
        marginTop: 18,
        marginBottom: 18,
        backgroundColor: colors.gray,
        borderColor: colors.gray,
        borderWidth: 0.2
    },
    autoGenerateHeader: {
        marginTop: 7,
        fontSize: 20
    },

    // row
    rowViewContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    rowView: {
        flex: 1
    },

    // tabs
    tabs: theme => ({
        backgroundColor: theme?.backgroundColor,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    }),
    tabView: {
        height: 55
    },

    insertFieldContainer: {
        flex: 0
    },
    label: {
        color: colors.secondary,
        fontSize: 14,
        fontFamily: fonts.poppinsMedium,
        paddingTop: 11,
        paddingBottom: 11,
        textAlign: 'left'
    }
});
