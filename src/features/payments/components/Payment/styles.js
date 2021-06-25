import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/styles';
import { isAndroidPlatform } from '@/constants';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    selectPicker: {
        marginTop: 17
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
    },
    paymentNumberField: {
        paddingVertical: 1,
        ...Platform.select({
            ios: {
                paddingVertical: 2
            }
        })
    },
    inBetweenSpace: {
        paddingHorizontal: 5
    },
    submitButton: {
        paddingHorizontal: 10
    },
    multipleButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btnContainerStyle: {
        marginHorizontal: 10
    },
    flex: {
        flex: 1
    }
});
