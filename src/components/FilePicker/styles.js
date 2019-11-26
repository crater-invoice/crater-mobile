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
    imageWithIconContainer: {
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        backgroundColor: colors.darkGray,
        padding: 8,
        borderRadius: 30,
        borderWidth: 2.5,
        borderColor: colors.veryLightGray
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
        color: colors.secondary,
        fontSize: 14,
        fontFamily: fonts.poppinsMedium
    },
    loadImage: {
        width: wp('88%'),
    }
});
