import { StyleSheet, Platform } from 'react-native';

import styles from '../FakeInput/styles';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
    fakeInput: {
        ...styles.fakeInput,
        paddingRight: 10,
        height: 47,
        ...Platform.select({
            ios: {
                height: 42,
            },
        }),
    },
    androidPicker: {
        height: 40,
        marginTop: -10,
        color: colors.secondary,
    },
    inputIOS: {
        ...styles.fakeInput,
        ...styles.textValue,
        paddingRight: 20,
        height: 42,
    },
    disabledSelectedValue: {
        ...styles.disabledSelectedValue,
    },
    rightIcon: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            android: {
                paddingTop: 3,
            },
        }),
    }
});
