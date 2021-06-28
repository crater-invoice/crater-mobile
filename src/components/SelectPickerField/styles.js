import { StyleSheet, Platform } from 'react-native';

import styles from '../FakeInput/styles';
import { colors, fonts } from '@/styles';

export default StyleSheet.create({
    fakeInput: theme => ({
        ...styles.fakeInput(theme),
        paddingRight: 10,
        height: 47,
        ...Platform.select({
            ios: {
                height: 42
            }
        })
    }),
    androidPicker: {
        height: 40,
        marginTop: -10,
        color: colors.secondary
    },
    inputIOS: theme => ({
        ...styles.fakeInput(theme),
        ...styles.textValue,
        paddingRight: 20,
        height: 42,
        color: theme?.text?.secondaryColor,
        fontFamily:
            theme?.mode === 'light' ? fonts.poppins : fonts.poppinsMedium
    }),
    disabledSelectedValue: theme => ({
        ...styles.disabledSelectedValue(theme)
    }),
    rightIcon: {
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            android: {
                paddingTop: 3
            }
        })
    },
    androidText: theme => ({
        paddingRight: 5,
        fontFamily:
            theme?.mode === 'light' ? fonts.poppins : fonts.poppinsMedium
    })
});
