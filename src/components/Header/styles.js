import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/styles';

export default StyleSheet.create({
    transparent: {
        backgroundColor: 'transparent'
    },
    containerStyle: {
        borderBottomWidth: 1,
        borderColor: colors.darkGray,
        backgroundColor: colors.white,
        marginTop: 8
    },
    borderBottom: {
        borderBottomWidth: 0
    },
    title: {
        fontSize: 17,
        marginLeft: 10
    },
    rightBtn: {
        flexDirection: 'row',
        marginRight: 10
    },
    hasCircle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 28,
        width: 28,
        borderRadius: 16,
        backgroundColor: colors.primary
    },
    rightBtnTitle: {
        paddingRight: 10,
        paddingTop: 3
    },
    rightContainer: {
        flexDirection: 'row'
    },
    filterColumn: {
        marginRight: 13,
        marginTop: 3
    }
});
