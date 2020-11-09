import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    Tabs: {
        backgroundColor: colors.veryLightGray,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    selectPicker: {
        marginTop: 12,
        marginBottom: 2
    }
});

export default styles;
