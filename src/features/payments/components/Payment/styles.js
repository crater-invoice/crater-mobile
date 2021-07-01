import { StyleSheet } from 'react-native';
import { isAndroidPlatform } from '@/constants';
import { colors } from '@/styles';

export default styles = StyleSheet.create({
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    date: {
        ...(isAndroidPlatform() && {
            paddingTop: 11,
            paddingBottom: 11
        })
    },
    numberDateFieldContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: -10
    },
    numberDateField: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'space-between'
    }
});
