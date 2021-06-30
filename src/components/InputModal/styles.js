import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export const styles = StyleSheet.create({
    modalViewContainer: theme => ({
        borderTopWidth: 10,
        borderTopColor: colors.primary,
        backgroundColor: theme.secondaryBgColor,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginHorizontal: 17
    }),
    heading: {
        fontSize: 17
    },
    // row
    rowViewContainer: theme => ({
        flexDirection: 'row'
    }),
    rowView: {
        flex: 1
    },

    fieldView: {
        marginVertical: 20
    },
    // button
    submitButton: {
        paddingHorizontal: 10
    },
    multipleButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    handleBtn: {
        marginHorizontal: 5
    },
    buttonContainer: {
        flex: 1
    }
});
