import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../styles/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
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
        // paddingVertical: 3
    },
    logoContainer: {
        paddingBottom: 40,
        alignItems: 'center',
        marginTop: -40,
    },
    imgLogo: {
        width: width - 150,
        height: 120,
        resizeMode: 'contain',
    },
    endpointTextTitle: {
        marginTop: 15,
        color: colors.veryDarkGray,
    },
    SendingMailContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        marginHorizontal: -5,
        marginTop: 55
    },
    buttonStyle: {
        paddingVertical: 10
    },
    skipButtonStyle: {
        marginTop: 5,
        marginHorizontal: -5,
    }
});
