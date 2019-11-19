import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';


const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        display: 'flex',
        backgroundColor: colors.veryLightGray
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    logoContainer: {
    },
    imgLogo: {
        width: width,
        height: 140,
        resizeMode: 'cover',
    },
    bodyContainer: {
        textAlign: "center",
        alignItems: "center",
    },
    title: {
        marginBottom: 25,
        color: colors.secondary,
        fontFamily: fonts.poppinsSemiBold,
        fontSize: 22,
    },
    internetIcon: {
        marginTop: 15,
        marginBottom: 10
    },
    description: {
        marginTop: 50,
        color: colors.veryDarkGray,
        fontFamily: fonts.poppinsLight,
        textAlign: "center",
        fontSize: 13,
    },
});
