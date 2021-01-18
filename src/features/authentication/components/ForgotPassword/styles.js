import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/styles';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        display: 'flex',
        paddingHorizontal: 5,
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    inputField: {
        paddingVertical: 3
    },
    logoContainer: {
        paddingBottom: 40,
        alignItems: 'center',
        marginTop: -35,
    },
    imgLogo: {
        width: width - 150,
        height: 120,
        resizeMode: 'contain',
    },
    forgotTextTitle: {
        marginTop: 10
    },
    SendingMailContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        marginHorizontal: -5,
        marginTop: 55
    },
    buttonStyle : {
        paddingVertical: 10
    },
    emailSendTitle: {
        paddingBottom: 10,
        color: colors.primary,
    },
    emailSendDescription: {
        paddingHorizontal: 10,
        paddingTop: 18,
        textAlign: 'justify',
    },
});
