import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    submitButton: {
        paddingHorizontal: 10
    },
    filePicker: {
        marginBottom: 10,
        marginTop: 4
    }
});
