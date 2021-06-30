import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export const styles = StyleSheet.create({
    dividerContainer: {
        marginVertical: 20,
        marginHorizontal: 12,
        position: 'relative'
    },
    divider: {
        backgroundColor: colors.darkGray,
        marginVertical: 15,
        height: 1
    },
    titleContainer: {
        position: 'absolute',
        top: 0,
        borderRadius: 10,
        height: 30,
        width: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        left: '45%'
    },
    withoutTitle: theme => ({
        backgroundColor: theme?.divider?.primaryBgColor,
        borderColor: theme?.divider?.primaryBgColor,
        borderWidth: 0.7,
        marginBottom: 2
    })
});
