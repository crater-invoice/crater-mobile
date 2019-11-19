import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { isIosPlatform } from '../../api/helper';

const container = {
    borderWidth: 1,
    borderColor: colors.gray,
    borderStyle: 'dashed',
    borderRadius: 4,
}

export const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        marginTop: 10,
    },
    images: {
        height: 110,
        resizeMode: "contain",
    },
    container: {
        ...container,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 22,

    },
    loadingContainer: {
        ...container,
        height: 100,
    },
    uploadContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        ...container,
        padding: 10
    },
    title: {
        paddingTop: 5,
        color: colors.darkGray,
        fontFamily: fonts.poppinsLight,
    },
    label: {
        paddingBottom: 7,
        color: colors.dark2,
        fontSize: 14,
        fontFamily: fonts.poppins,
    },
    loadImage: {
        width: wp('88%'),
    }
});
