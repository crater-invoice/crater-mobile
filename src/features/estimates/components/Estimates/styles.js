import { StyleSheet } from 'react-native';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    tabs: theme => ({
        backgroundColor: theme?.backgroundColor,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    }),
    selectPicker: {
        marginTop: 15
    }
});
