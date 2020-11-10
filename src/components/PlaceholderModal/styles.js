import { isIPhoneX } from '@/constants';
import { colors, fonts } from '@/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Modal
    modalViewContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.veryLightGray,
        paddingBottom: isIPhoneX() ? 25 : 5
    },

    body: {
        flex: 1,
        paddingHorizontal: isIPhoneX() ? 22 : 20
    },
    items: {
        paddingVertical: isIPhoneX() ? 10 : 5,
        flexDirection: 'row'
    },
    item: {
        paddingBottom: 1,
        paddingRight: 15,
        flexDirection: 'row'
    },
    itemText: {
        fontSize: 15,
        fontFamily: fonts.poppinsMedium,
        paddingVertical: 6,
        color: colors.darkGray2,
        marginLeft: 6
    },

    labelView: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%'
    },
    label: {
        fontSize: 15,
        color: colors.darkGray,
        fontFamily: fonts.poppinsMedium
    },
    arrowIcon: {
        justifyContent: 'center'
    }
});

export default styles;
