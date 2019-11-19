import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';


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
        paddingBottom: 30,
        alignItems: 'center',
        marginTop: -70,
    },
    imgLogo: {
        width: width - 150,
        height: 120,
        resizeMode: 'contain',
    },
    bodyContainer: {
        textAlign: "center",
        alignItems: "center",
    },
    title: {
        paddingBottom: 10,
        color: colors.primary,
    },
    subTitle: {
        paddingTop: 5,
        color: colors.primaryLight,
    },
    description: {
        paddingHorizontal: 10,
        paddingTop: 18,
        color: colors.primaryLight,
        textAlign: "center",
    },
});
