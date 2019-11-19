import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fonts } from '../../../../styles/fonts';
import { isIPhoneX } from '../../../../api/helper';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17,
    },
    submitButton: {
        // display: 'flex',
        paddingHorizontal: 10,
    },
    selectPicker: {
        marginTop: 20,
    },
    filePicker: {
        marginBottom: 20,
        marginTop: 4,
    }
});
