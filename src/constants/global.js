import * as Font from 'expo-font';
import { Alert, Keyboard } from 'react-native';
import Poppins from '../assets/fonts/Poppins-Regular.ttf';
import PoppinsLight from '../assets/fonts/Poppins-Light.ttf';
import PoppinsMedium from '../assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsBold from '../assets/fonts/Poppins-Bold.ttf';

export const loadFonts = async ({ afterLoad }) => {
    await Font.loadAsync({
        Poppins: Poppins,
        'Poppins-light': PoppinsLight,
        'Poppins-medium': PoppinsMedium,
        'Poppins-semi-bold': PoppinsSemiBold,
        'Poppins-bold': PoppinsBold
    });

    afterLoad && afterLoad();
};


export const MAX_LENGTH = 255;

// Alert
// -----------------------------------------
export const alertMe = ({
    title = '',
    desc = '',
    okText = 'OK',
    okPress = null,
    showCancel = false,
    cancelText = 'Cancel',
    cancelPress = null
}) => {
    const cancel = showCancel
        ? {
              text: cancelText,
              onPress: cancelPress ? cancelPress : () => {},
              style: 'cancel'
          }
        : {};

    Alert.alert(
        title,
        desc,
        [
            {
                text: okText,
                onPress: okPress ? okPress : () => {},
                style: 'cancel'
            },
            cancel
        ],
        { cancelable: true }
    );
};

// Keyboard Type
// -----------------------------------------
export const KEYBOARD_TYPE = {
    DEFAULT: 'default',
    NUMERIC: 'numeric',
    EMAIL: 'email-address',
    PHONE: 'phone-pad',
    URL: 'url'
};

// Field Is Fillable ?
// -----------------------------------------
export const hasValue = field => {
    return field !== null && typeof field !== 'undefined';
};

export const hasLength = field => {
    return field && field.length !== 0;
};

export const hasFieldValue = fields => hasValue(fields) && hasLength(fields);

export const isArray = fields => hasValue(fields) && hasLength(fields);

export const hasObjectLength = field => {
    return field && Object.keys(field).length !== 0;
};

export const isBooleanTrue = field => {
    return Boolean(field);
};

export const hasTextLength = string => {
    return hasValue(string) && string.length !== 0
};

export function dismissKeyboard() {
    Keyboard.dismiss();
}
