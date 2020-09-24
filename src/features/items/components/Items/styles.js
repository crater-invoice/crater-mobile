import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { isIPhoneX } from '../../../../api/helper';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray,
    },
    listViewContainer: {
        flex: 1,
        paddingBottom: isIPhoneX() ? 30 : 0,
    },
    selectPicker: {
        marginTop: 12,
        marginBottom: 2,
    },
});
