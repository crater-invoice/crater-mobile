import { StyleSheet } from 'react-native';
import { fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        height: hp('20%'),
        width: wp('40%'),
        resizeMode: "contain",
    },
    emptyTitle: {
        textAlign: "center",
        color: colors.dark,
        fontSize: 18,
        marginTop: 15,
        fontFamily: fonts.poppinsSemiBold,
        paddingHorizontal: 10,
        fontWeight: "600"
    },
    emptyDescription: {
        textAlign: "center",
        paddingHorizontal: 10,
        color: colors.veryDarkGray,
        marginTop: 5
    },
    emptyButton: {
        marginTop: 22,
        marginHorizontal: 40
    },
});
