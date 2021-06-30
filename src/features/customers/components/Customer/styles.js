import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    inputGroup: {
        marginVertical: 10
    },
    addressField: {
        marginTop: -10,
        borderTopWidth: 0
    },
    submitButton: {
        paddingHorizontal: 10
    },
    flex: {
        flex: 1
    },
    line: theme => ({
        borderTopWidth: 0.4,
        borderBottomWidth: 0.4
    }),
    selectedField: {
        paddingLeft: 52
    },
    currency: {
        fontSize: 15,
        top: 2
    }
});
