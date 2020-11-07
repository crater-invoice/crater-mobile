import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.veryLightGray
    },
    mainContainer: {
        paddingHorizontal: 20
    },
    headerContainer: {
        backgroundColor: colors.veryLightGray
    },
    submitButton: {
        paddingHorizontal: 10
    },
    eyeIcon: {
        top: 6
    },
    dividerLine: {
        marginVertical: 18,
        backgroundColor: colors.gray,
        borderColor: colors.lightGray,
        borderWidth: 0.2
    },
    versionContainer: {
        marginVertical: 17
    },
    versionTitle: {
        color: colors.secondary,
        fontFamily: fonts.poppins,
        fontSize: 16,
        textAlign: 'left'
    },
    version: {
        fontFamily: fonts.poppinsSemiBold,
        textAlign: 'left'
    },
    avatarContainer: {
        marginTop: 25,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flex: 1
    },
    imageContainerStyle: {
        padding: 0,
        borderWidth: 0,
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden'
    },
    imageStyle: {
        width: 150,
        height: 150,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    loadingContainerStyle: {
        borderWidth: 0
    }
});
