import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    mainContainer: {
        paddingHorizontal: 20
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
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
    handleBtn: {
        marginHorizontal: 5
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
        fontFamily: fonts.poppins
    },
    insertFields: {
        color: colors.primary,
        fontFamily: fonts.poppins,
        fontSize: 16,
        paddingBottom: 6,
        textAlign: 'left'
    }
});
