import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';
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
        marginTop: 15,
        paddingHorizontal: 10
    },
    emptyDescription: {
        paddingHorizontal: 10,
        marginTop: 5
    },
    emptyButton: {
        marginTop: 22,
        marginHorizontal: 40
    },
});
