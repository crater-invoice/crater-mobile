import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        margin: 0,
        paddingVertical: 7
    },
    buttonContainer: {},
    containerStyle: {
        borderWidth: 5,
        borderRadius: 10,
        borderColor: 'transparent',
        padding: 0,
        backgroundColor: 'transparent'
    },
    containerShadow: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: colors.lightGray,
        shadowColor: colors.lightGray,
        backgroundColor: colors.white,
        borderTopWidth: 0.3,
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 7,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },
    titleStyle: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.white,
        textAlign: 'left'
    },
    imageIcon: {
        width: 20,
        height: 20,
        marginRight: 15
    },

    buttonOutline: {
        backgroundColor: 'transparent'
    }
});
