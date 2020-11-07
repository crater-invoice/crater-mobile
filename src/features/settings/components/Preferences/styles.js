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
    submitButton: {
        paddingHorizontal: 10
    },
    selectedField: {
        paddingLeft: 47
    },
    dividerLine: {
        marginTop: 18,
        marginBottom: 18,
        backgroundColor: colors.gray,
        borderColor: colors.lightGray,
        borderWidth: 0.2
    },
    label: {
        color: colors.dark3,
        fontFamily: fonts.poppinsMedium,
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left'
    }
});
