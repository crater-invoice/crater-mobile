import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    listViewContainer: {
        flex: 1,
    },
    Tabs: {
        backgroundColor: colors.lightGray,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    headerTitle: {
        fontSize: 30,
        color: colors.dark2,
        fontWeight: '600',
    },
    inputField: {
        paddingHorizontal: 19,
        paddingVertical: 0,
        marginVertical: 8,
    },
});
