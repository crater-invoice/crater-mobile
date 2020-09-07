import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

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
    timeColumn: { flex: 1 }
});

export default styles;
