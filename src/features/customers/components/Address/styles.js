import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    handleBtn: {
        marginHorizontal: 9,
    },
    addressStreetField: {
        marginTop: -20,
    },
    sameAsToggle: {
        color: colors.primary
    },
});
