import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export const styles = StyleSheet.create({
    modalViewContainer: {
        borderTopWidth: 10,
        borderTopColor: colors.primary,
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginHorizontal: 17
    },
    heading: {
        color: colors.dark2,
        fontFamily: fonts.poppins,
        fontSize: 17,
        textAlign: 'left'
    },
    // row
    rowViewContainer: {
        // flex: 1,
        flexDirection: 'row'
    },
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
