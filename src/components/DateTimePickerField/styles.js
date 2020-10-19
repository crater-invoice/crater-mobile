import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    label: {
        color: colors.secondary,
        fontSize: 14,
        fontFamily: fonts.poppinsMedium
    },
    row: {
        flexDirection: 'row'
    },
    dateColumn: {
        flex: 1.2
    },
    timeColumn: { flex: 1 },
    required: {
        color: colors.danger
    },
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
