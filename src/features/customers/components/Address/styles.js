import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray,
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
    flexRow: {
        flex: 1
    }
});
