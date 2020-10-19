import React, { Fragment } from 'react';
import { Platform, findNodeHandle, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from "@react-native-community/netinfo";
import moment from 'moment';
import { fonts } from '@/styles';

const model = Constants.deviceName.toLowerCase();

// export const isIPhoneX = () => model.indexOf('iphone x') !== -1;

export function isIPhoneX() {
    const dimension = Dimensions.get('window');
    return (
        Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
        ((dimension.height === 812 || dimension.width === 812) || (dimension.height === 896 || dimension.width === 896))
    );
}

export const trim = (data) => {
    return Object.keys(data).reduce((accumulator, key) => {
        accumulator[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];

        return accumulator;
    }, {});
};

export const isIosPlatform = () => Platform.OS === 'ios';

export const definePlatformParam = (ios, android) => (isIosPlatform() ? ios : android);

export const scrollToInput = ({ scrollView }, { target }) => {
    scrollView.scrollToFocusedInput(findNodeHandle(target));
};

export const pick = (object = {}, keys = []) => {
    const result = {};

    keys.forEach((key) => {
        result[key] = object[key];
    });

    return result;
};

export const formatMoney = (amount, currency = 0) => {
    amount = (amount / 100)

    if (!currency) {
        currency = { precision: 2, thousand_separator: ',', decimal_separator: '.', symbol: '$' }
    }

    let { precision, decimal_separator, thousand_separator, symbol } = currency

    try {
        precision = Math.abs(precision)
        precision = isNaN(precision) ? 2 : precision

        const negativeSign = amount < 0 ? '-' : ''

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(precision)).toString()
        let j = (i.length > 3) ? i.length % 3 : 0

        // return symbol + ' ' + negativeSign + (j ? i.substr(0, j) + thousand_separator : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand_separator) + (precision ? decimal_separator + Math.abs(amount - i).toFixed(precision).slice(2) : '')
        return { symbol, money: negativeSign + (j ? i.substr(0, j) + thousand_separator : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand_separator) + (precision ? decimal_separator + Math.abs(amount - i).toFixed(precision).slice(2) : '') }

    } catch (e) {
        // console.log(e)
    }
}

export const getConditionStyles = (styles: IGetConditionStyles) => {
    let commonStyles = {};

    if (typeof styles === 'object' && Array.isArray(styles)) {
        styles
            .filter((v) => !!v && typeof v === 'object')
            .forEach((v) => {
                const { condition, style } = v;

                if (condition) {
                    commonStyles = { ...commonStyles, ...style };
                } else {
                    commonStyles = { ...commonStyles, ...v };
                }
            });
    }

    return commonStyles;
};

export const checkConnection = async (callback) => {

    let state = await NetInfo.fetch()

    let { isConnected } = state

    if (callback && typeof callback === 'function') {
        callback(isConnected);
    }

    return isConnected;
}

export const checkExpiredToken = (expiresIn) => {
    if (expiresIn) {
        return !moment().isBefore(moment(expiresIn))
    }
    return true
}
