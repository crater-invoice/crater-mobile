import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    selectPicker: {
        marginTop: 17
    },
    numberDateFieldContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: -10
    },
    numberDateField: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'space-between'
    },
    paymentNumberField: {
        paddingVertical: 1,
        ...Platform.select({
            ios: {
                paddingVertical: 2
            }
        })
    },
    inBetweenSpace: {
        paddingHorizontal: 5
    },
    submitButton: {
        paddingHorizontal: 10
    },
    multipleButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btnContainerStyle: {
        marginHorizontal: 10
    },
    flex: {
        flex: 1
    },
    noteContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: -12
    },
    noteHintStyle: {
        paddingBottom: 6,
        color: colors.dark2,
        fontSize: 14,
        paddingLeft: 4,
        fontFamily: fonts.poppins,
        textAlign: 'left'
    },
    insertNote: {
        color: colors.primary,
        fontFamily: fonts.poppins,
        fontSize: 16,
        paddingBottom: 6,
        textAlign: 'left'
    }
});
