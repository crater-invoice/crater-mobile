import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export const styles = StyleSheet.create({
    fieldContainer: {
        marginTop: 15,
    },
    buttonGroupContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    label: {
        color: colors.dark2,
        fontFamily: fonts.poppins
    },
    hintStyle: {
        color: colors.dark2,
        fontFamily: fonts.poppins,
        marginBottom: 15,
    },
    checkedLabel: {
        color: colors.primary,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.lightGray,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkedCircle: {
        backgroundColor: colors.primary,
    },
    middleCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.white,
    },
});
