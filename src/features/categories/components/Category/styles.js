import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    mainContainer: {
        paddingHorizontal: 20,
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray,
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17,
    },
    submitButton: {
        paddingHorizontal: 10,
    },
    multipleButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btnContainerStyle: {
        marginHorizontal: 10,
    },
    flex: {
        flex: 1
    },
    handleBtn: {
        marginHorizontal: 5,
    },

});
