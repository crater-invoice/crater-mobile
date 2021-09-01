import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '@/styles';

const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    expireToggle: {
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'space-between'
    },
    inputTextStyle: {
        color: colors.dark3,
        fontFamily: fonts.medium,
        textAlign: 'left'
    },
    noteHintStyle: {
        paddingBottom: 6,
        color: colors.dark2,
        fontSize: 14,
        fontFamily: fonts.regular,
        textAlign: 'left'
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    handleBtn: {
        marginHorizontal: 9
    },
    buttonContainer: {
        flex: 1
    },
    itemContainer: {
        marginVertical: 4,
        borderWidth: 1,
        borderColor: colors.lightGray
    },
    itemLeftTitle: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: colors.dark,
        textAlign: 'left'
    },
    itemLeftSubTitleLabel: {
        marginLeft: -6
    },
    itemLeftSubTitle: {
        color: colors.darkGray,
        fontSize: 13
    },
    itemRightTitle: {
        fontFamily: fonts.regular,
        fontSize: 18,
        color: colors.secondary,
        textAlign: 'left'
    },
    label: {
        paddingBottom: 4,
        paddingTop: 12
    },
    termsEditText: {
        color: colors.primary
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    column: {
        flex: 3,
        marginLeft: 15,
        marginTop: 4,
        alignSelf: 'center'
    },
    customRepeatField: {
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});
