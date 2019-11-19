import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17,
    },
    leftIcon: {
        color: colors.dark,
    },
    inputGroup: {
        marginVertical: 10,
    },
    divider: {
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
        borderWidth: 0.7,
        marginTop: 10,
        marginBottom: 8,
    },
    dividerStyle: {
        borderBottomWidth: 0.5,
        borderColor: colors.lightGray,
        marginTop: 3,
    },
    addressField: {
        marginTop: -10,
        borderTopWidth: 0,
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
});
