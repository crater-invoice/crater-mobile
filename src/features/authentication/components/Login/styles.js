import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '@/styles';
import { defineLargeSizeParam } from '@/constants';

const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: colors.veryLightGray
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: -55
    },
    imgLogo: {
        width: width - 150,
        height: 180,
        resizeMode: 'contain'
    },
    forgetPasswordContainer: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 2,
        marginTop: 8
    },
    forgetPassword: {
        fontSize: 15,
        color: colors.primaryLight,
        fontFamily: fonts.poppinsLight,
        textAlign: 'left'
    },
    socialLoginContainer: {},
    inputField: {
        paddingVertical: 3,
        borderRadius: 3
    },
    biometryButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        position: 'absolute',
        bottom: defineLargeSizeParam(50, 5),
        left: 0,
        right: 0
    },
    biometryText: {
        fontSize: 17,
        color: colors.primary,
        fontWeight: '500',
        opacity: 0.9
    }
});
