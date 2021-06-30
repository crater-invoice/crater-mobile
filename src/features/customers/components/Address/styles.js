import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    container: theme => ({
        flex: 1,
        backgroundColor: theme?.backgroundColor
    }),
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    handleBtn: {
        marginHorizontal: 9
    },
    addressStreetField: {
        marginTop: -20
    },
    sameAsToggle: {
        color: colors.primary
    },
    flexRow: {
        flex: 1
    }
});
