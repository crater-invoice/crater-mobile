import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    row: {
        flexDirection: 'row'
    },
    dateColumn: {
        flex: 1.2
    },
    timeColumn: { flex: 1 },
    validation: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 2,
        overflow: 'hidden',
        flex: 1,
        zIndex: 100,
        backgroundColor: colors.danger,
        marginTop: -9
    },
    inputError: {
        borderColor: colors.dangerLight
    }
});

export default styles;
