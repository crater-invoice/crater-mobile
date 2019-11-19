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
    submitButton: {
        paddingHorizontal: 10,
    },
    multipleButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    handleBtn: {
        marginHorizontal: 5,
    },
    buttonContainer: {
        flex: 1
    }
});
