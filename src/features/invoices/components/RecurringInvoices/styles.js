import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    Tabs: {
        backgroundColor: colors.veryLightGray,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    selectPicker: {
        marginTop: 12,
        marginBottom: 2,
    },
    toastContainer: {
        bottom: 7,
        paddingHorizontal: 10,
    },
    headerTitle: {
        fontSize: 18,
        marginLeft: -5
    }
});
